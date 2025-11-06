import { createEffect, createMemo, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import bkgAudio from './assets/BackbayLounge.mp3';
import gearAudio from './assets/gear.wav';
import clickAudio from './assets/click.ogg';
import keyPressAudio from './assets/keyPress.ogg';
import tapAudio from './assets/ceramicTap.wav';
import corkscrew from './assets/corkscrewTap.wav';
import vhs from './assets/vhsEject.wav';
import dialogueJson from './dialogue.json';
import profilesJson from './profiles.json';
import type { Dialogue, Profile } from "./Dialogue";

// Goal: Simulate dialogue in order to introduce myself, and converse on topics with branching points of discussion

function App() {
  let textContainer!: HTMLDivElement;
  let playerRef!: HTMLDivElement;
  let moveMarkerRef!: HTMLDivElement;
  let bgRef!: HTMLDivElement;

  const [scrollProgress, setScrollProgress] = createSignal<number>(2.5);
  const [portfolioOpen, setPortfolioOpen] = createSignal<boolean>(false);
  const [contactOpen, setContactOpen] = createSignal<boolean>(false);
  const [resumeOpen, setResumeOpen] = createSignal<boolean>(false);

  const [npcPfp, setNpcPfp] = createSignal<string>('');
  const [showSuccess, setShowSuccess] = createSignal<boolean>(false);
  const [showFailure, setShowFailure] = createSignal<boolean>(false);
  const [showSettings, setShowSettings] = createSignal<boolean>(false);
  const [audioOn, setAudioOn] = createSignal<boolean>(true);
  const [queuedBarks, setQueuedBarks] = createSignal<string[]>([]);
  const [removingBark, setRemovingBark] = createSignal<boolean>(false);
  const [currentTime, setCurrentTime] = createSignal<string>('');
  const [currentDate, setCurrentDate] = createSignal<Date>(new Date());
  const [needTimeUpdate, setNeedTimeUpdate] = createSignal<boolean>(true);
  const [adventureActive, setAdventureActive] = createSignal<boolean>(false);

  createEffect(() => {
    if (needTimeUpdate()) {
      const now = new Date();
      setCurrentDate(now);
      const hours = now.getHours();
      const minutesRaw = now.getMinutes();
      const minutes = minutesRaw < 10 ? "0" + minutesRaw : minutesRaw;
      setCurrentTime(hours + ":" + minutes);
      setNeedTimeUpdate(false);
    }
  })

  setInterval(function() {
    setNeedTimeUpdate(true);
  }, 60 * 1000);

  // Queue dialogue per path, clear on thought completion
  // Clicking a dialogue option looks up the response in the 
  const [currentDialogue, setCurrentDialogue] = createSignal<Dialogue[]>([dialogueJson.dialogue[0]]);
  const dialogueDictionary = createMemo(() => {
    const map = new Map<string, Dialogue>();
    dialogueJson.dialogue.forEach((d) => {
      map.set(d.id, d as Dialogue);
    });
    return map;
  });
  const profilesDictionary = createMemo(() => {
    const map = new Map<string, Profile>();
    profilesJson.profiles.forEach((p) => {
      map.set(p.id, p as Profile);
    });
    return map;
  });

  let bkgAudioComponent!: HTMLAudioElement;
  let gearAudioComponent!: HTMLAudioElement;
  let clickAudioComponent!: HTMLAudioElement;
  let keyPressAudioComponent!: HTMLAudioElement;
  let tapAudioComponent!: HTMLAudioElement;
  let corkscrewAudio!: HTMLAudioElement;
  let vhsAudio!: HTMLAudioElement;

  const barks = [
    'hey',
    'stop that',
    'ouch',
    'watch it',
    '...',
    '!',
    '!!!',
    'cut it out',
    'heck',
    'oof',
    '>:(',
    ':\'(',
  ];

  onMount(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (audioOn() && (resumeOpen() || portfolioOpen() || contactOpen())) {
          keyPressAudioComponent.volume = 0.075;
          keyPressAudioComponent.play();
        }
        setResumeOpen(false);
        setPortfolioOpen(false);
        setContactOpen(false);
      }
    });
  });
  onCleanup(() => {
    document.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (audioOn() && (resumeOpen() || portfolioOpen() || contactOpen())) {
          keyPressAudioComponent.volume = 0.075;
          keyPressAudioComponent.play();
        }
        setResumeOpen(false);
        setPortfolioOpen(false);
        setContactOpen(false);
      }
    });
  });

  createEffect(() => {
    if (!removingBark() && queuedBarks().length > 0) {
      setRemovingBark(true);
      setTimeout(() => {
        setQueuedBarks([...queuedBarks().filter(b => b !== queuedBarks()[0])]);
        setRemovingBark(false);
      }, 1000);
    }
  })

  return (
    <>
      <div class='w-full h-full flex select-none justify-center overflow-hidden'>
        <audio id="bkg-audio" ref={bkgAudioComponent} src={bkgAudio} loop />
        <audio ref={gearAudioComponent} src={gearAudio} />
        <audio ref={clickAudioComponent} src={clickAudio} />
        <audio ref={keyPressAudioComponent} src={keyPressAudio} />
        <audio ref={tapAudioComponent} src={tapAudio} />
        <audio ref={corkscrewAudio} src={corkscrew} /> {/*chick - corkscrew.wav by vitriolix -- https://freesound.org/s/779/ -- License: Attribution NonCommercial 4.0*/}
        <audio ref={vhsAudio} src={vhs} /> {/*VHS - Insert/Play/Eject by degoose -- https://freesound.org/s/580911/ -- License: Attribution 4.0*/}
        <div class='w-full h-full flex items-center justify-center bg-black'>
          <Show when={!currentDialogue()[0].id.includes('tutorial')}>
            <div ref={bgRef}  class='absolute w-full h-full flex items-center justify-center overflow-hidden'> {/* TODO: Mask this div if necessary */}
              <div class='w-full h-full mt-[35%] flex items-center justify-center origin-center scale-x-225' onclick={async (e) => {
                if (!adventureActive()) return;
                moveMarkerRef.style.left = e.clientX - 4+'px';
                moveMarkerRef.style.top = e.clientY - 8+'px';
                moveMarkerRef.style.opacity = '100%';
                const flashMarker = [
                  {opacity: 0}
                ];

                const movePlayer = [
                  {transform: `translate(${e.clientX - playerRef.getBoundingClientRect().left - playerRef.getBoundingClientRect().width/2}px, ${e.clientY - playerRef.getBoundingClientRect().top-playerRef.getBoundingClientRect().height}px)`}
                ];
                const moveTiming = {
                  duration: 1000,
                  iterations: 1,
                }
                playerRef.animate(movePlayer, moveTiming);
                moveMarkerRef.animate(flashMarker, moveTiming);

                setTimeout(() => {
                  playerRef.style.left = e.clientX-playerRef.getBoundingClientRect().width/2+'px';
                  playerRef.style.top = e.clientY-playerRef.getBoundingClientRect().height+'px';
                  moveMarkerRef.style.opacity = '0%';
                }, 1000);
              }}>
                <div class='xl:w-200 xl:h-200 lg:w-120 lg:h-120 bg-neutral-600 bg-center bg-repeat bg-auto rotate-45 origin-center'/>
              </div>
              <div class='absolute w-full h-full justify-center items-center flex'>
                <div class='w-240 xl:h-75 lg:h-60 bg-neutral-400 bg-bottom bg-repeat-x bg-contain -skew-y-24 mb-[6.5%]'/>
                <div class='w-240 xl:h-75 lg:h-60 bg-neutral-200 bg-bottom bg-repeat-x bg-contain skew-y-24 mb-[6.5%]'/>
              </div>
            </div>
            <Show when={adventureActive()}>
              <div ref={moveMarkerRef} class='absolute w-2 h-2 rounded-full text-white opacity-0'>
                <i class='ph-bold ph-caret-down'/>
              </div>
              <div ref={playerRef} class='origin-center absolute w-[2%] h-[10%] bg-neutral-800 flex rounded-full overflow-visible'/>
            </Show>
          </Show>
        </div>
        <div class='absolute flex flex-row left-0 top-0 p-4 text-neutral-600 text-4xl items-center justify-center'>
          <i class='ph-duotone ph-gear mr-2 hover:text-neutral-500' onclick={() => {
            setShowSettings(!showSettings());
            if (audioOn()) {
              gearAudioComponent.volume = 0.1;
              gearAudioComponent.play();
            }
          }}/>
          <Show when={showSettings()}>
            <div class='rounded-r flex flex-row items-center justify-center'>
              <Show when={audioOn()} fallback={
                <i class='ph-duotone ph-speaker-slash mr-2 hover:text-neutral-500' onclick={()=>{
                  setAudioOn(true);
                  clickAudioComponent.volume = 0.1;
                  clickAudioComponent.play();
                }}/>
              }>
                <i class='ph-duotone ph-speaker-high mr-2 hover:text-neutral-500' onclick={()=>{
                  setAudioOn(false);
                }}/>
              </Show>
              <i class='ph-duotone ph-arrow-counter-clockwise mr-2 hover:text-neutral-500' onclick={()=>{
                setCurrentDialogue([dialogueJson.dialogue[0]]);
                if (audioOn()) {
                  clickAudioComponent.volume = 0.1;
                  clickAudioComponent.play();
                }
              }}/>
            </div>
          </Show>
        </div>
        <Show when={showFailure()}>
          <div class='w-full h-full absolute' style={{
            background: 'rgba(0, 0, 0, 0) radial-gradient(ellipse at top, rgba(0, 0, 0, 0) 75%, rgba(255, 115, 115, 1) 100%)',
          }}/>
          <div class='w-full h-full absolute' style={{
            background: 'rgba(0, 0, 0, 0) radial-gradient(ellipse at top, rgba(0, 0, 0, 0) 75%, rgba(115, 0, 0, 1) 100%)',
          }}/>
        </Show>
        <Show when={showSuccess()}>
          <div class='w-full h-full absolute' style={{
            background: 'rgba(0, 0, 0, 0) radial-gradient(ellipse at top, rgba(0, 0, 0, 0) 75%, rgba(255, 115, 115, 1) 100%)',
          }}/>
          <div class='w-full h-full absolute' style={{
            background: 'rgba(0, 0, 0, 0) radial-gradient(ellipse at top, rgba(0, 0, 0, 0) 75%, rgba(115, 255, 115, 1) 100%)',
          }}/>
          
        </Show>
        {/* TODO: Replace placeholder image */}
        <Show when={!currentDialogue()[0].id.includes('tutorial')} >
          <div title='https://picrew.me/ja/image_maker/197705' class='absolute flex bg-clip-content bg-no-repeat bg-cover bg-center bg-orange-300 w-1/12 h-1/4 rotate-y-180 left-0 bottom-0 border-14 border-neutral-800/90 items-center justify-center text-red-400' style={{
            'background-image': "url('../src/assets/pfp.png')",
          }} onclick={() => {
            if (audioOn()) {
              tapAudioComponent.volume = 0.1;
              tapAudioComponent.play();
            }
            setQueuedBarks([...queuedBarks(), barks[Math.round(Math.random() * (barks.length -1))]]);
          }}
          />
          <For each={queuedBarks()}>
            {(bark) => 
              <div class='absolute flex w-content h-content text-neutral-800 text-md p-2 bg-neutral-200/90 border border-neutral-400 rounded-full'
                style={{
                  left: Math.random()*(12-6) + '%',
                  bottom: Math.random()*(60-40) + '%',
                }}
              >
                {bark}
              </div>
            }
          </For>
        </Show>
        {/* <div class='absolute flex w-1/12 h-1/4 left-1/11 bottom-0 border-14 border-neutral-800/90 items-center justify-center text-red-400'>
          Cats pic
        </div> */}
        <div class={`absolute xl:w-1/4 lg:w-1/3 h-9/10 lg:right-1/10 lg:mx-0 mx-[10vw] ${!currentDialogue()[0].id.includes('tutorial') && 'bg-neutral-800/90 border-14 border-t-0 border-neutral-400/50 border-b-8 border-b-neutral-600'} px-16 py-36`}>
          {/* TODO: Replace placeholder image */}
          <Show when={npcPfp().length > 0}>
            <div title='https://picrew.me/ja/image_maker/197705' class='absolute bg-clip-content bg-no-repeat bg-cover bg-center bg-lime-950 start-[-25%] w-1/3 h-1/4 border-14 border-neutral-900' style={{
              'background-image': `url(${npcPfp()})`,
            }}/>
          </Show>
          <div class='flex flex-row w-full h-full'>
            <div ref={textContainer} class='w-full h-9/10 overflow-hidden overflow-y-scroll' onScroll={(e) => {
              // TODO: Fix for varying screen sizes
              setScrollProgress(((e.currentTarget.scrollTop / (e.currentTarget.scrollHeight - e.currentTarget.clientHeight)) * 100)+4);
            }}>
              <For each={currentDialogue()}>
                {
                  (dialogue, index) => 
                    <For each={dialogue.content.filter((c) => c.text.length > 0)}>
                      {
                        (content) =>
                          <div class={`font-serif ${index() === currentDialogue().length - 1 ? 'text-neutral-400' : 'text-neutral-600'} pb-2`}>
                            <b style={content.pov ? {'color': profilesDictionary().get(content.pov)?.color ?? 'oklch(0.439 0 0)'} : {}}>{content.pov ? content.pov + ' - ' : ''}</b>
                            {content.text}
                          </div>
                      }
                    </For>
                }
              </For>
              <For each={currentDialogue()[currentDialogue().length - 1].options}>
                {
                  (option, index) =>
                    <div class='flex flex-row font-serif text-orange-400 hover:text-orange-200 pb-2' onclick={() => {
                      if (audioOn()) {
                        corkscrewAudio.volume = 0.8;
                        corkscrewAudio.play();
                      }
                      // TODO: Actually roll and set success/failure depending on difficulty, if difficulty has a value
                      const result = dialogueDictionary().get(option.success);
                      if (option.success === 'intro') {
                        if (result){
                          setCurrentDialogue([result]);
                          setNpcPfp('');
                          return;
                        }
                      }
                      if (!result) {
                        const error = dialogueDictionary().get('error');
                        if (!error) return;
                        setCurrentDialogue([error]);
                        setNpcPfp('');
                        return;
                      }
                      setCurrentDialogue([...currentDialogue(), result]);
                      const speaker = result.content[result.content.length - 1].pov;
                      if (speaker) {
                        setNpcPfp(profilesDictionary().get(speaker)?.pfp ?? '');
                      } else {
                        setNpcPfp('');
                      }
                      setTimeout(() => {
                        textContainer.scrollTo({top: textContainer.scrollHeight, behavior: 'smooth'});
                      });
                    }}>
                      <p class='text-white'>
                        {(index()+1)+'.-'}
                      </p>&nbsp;
                      {option.optionText}
                    </div>
                }
              </For>
              <Show when={currentDialogue()[currentDialogue().length - 1].options.length === 0}>
                <div class='flex flex-row text-white text-2xl bg-red-800 pl-4 pt-2 mt-2 items-center' onclick={() => {
                  if (audioOn()) {
                    vhsAudio.volume = 0.8;
                    vhsAudio.play();
                  }
                  setTimeout(() => {
                    // Default state after tutorial
                    const intro = dialogueDictionary().get('intro');
                    if (!intro) return;
                    setCurrentDialogue([intro]);
                    setNpcPfp('');
                  }, audioOn() ? 2000 : 0);
                }}>
                  CONTINUE
                  <i class='ph-bold ph-caret-right pl-1 pt-1' />
                </div>
              </Show>
            </div>
            <div class='h-9/10'>
              <div class='flex flex-col h-full items-center'>
                <i class='ph-bold ph-caret-up text-neutral-500' onclick={() => {
                  if (textContainer.scrollTop > 0 && textContainer.scrollTop < 20) textContainer.scrollTop = 0;
                  else if (textContainer.scrollTop > 0) textContainer.scrollTop -= 20;
                }}/>
                {/* TODO: Fix scroll thumb */}
                {/* <div class={`absolute w-3 h-3 rounded-full bg-neutral-200 justify-self-center`} style={{
                  'margin-top': (scrollProgress()) +'%',
                }}/> */}
                <div class='w-[1px] h-full'/> {/* bg-neutral-600 */}
                <i class='ph-bold ph-caret-down text-neutral-500' onclick={() => {
                  if (textContainer.scrollTop < textContainer.scrollHeight && textContainer.scrollTop > textContainer.scrollHeight - 20) textContainer.scrollTop = textContainer.scrollHeight;
                  else if (textContainer.scrollTop < textContainer.scrollHeight) textContainer.scrollTop += 20;
                }}/>
              </div>
            </div>
          </div>
        </div>
        <Show when={!currentDialogue()[0].id.includes('tutorial')}>
          <div class='absolute flex flex-col w-1/6 h-1/8 bg-neutral-900 right-0 bottom-0 border-t-8 border-neutral-600 justify-center items-center text-neutral-400'>
            <div class='flex flex-row items-center pb-2'>
              <i class='ph-duotone ph-diamonds-four pr-1'/>
              <div class='pr-4'>
                {(currentDate().getMonth()+1)+'.00'}
              </div>
              <div class='text-center text-4xl pr-4'>
                {currentTime()}
              </div>
              <div>
                {'Day '+currentDate().getDate()}
              </div>
            </div>
            <div class='flex flex-row items-center p-1 overflow-hidden'>
              <div class='scale-x-[-1] pl-2'>
                <div class='border border-neutral-600 py-1 px-2 rounded hover:bg-neutral-800'>
                  <i class='ph-duotone ph-hand-pointing'/>
                </div>
              </div>
              <div class='border border-neutral-600 py-1 px-2 rounded hover:bg-neutral-800'>
                <i class='ph-duotone ph-hand-pointing'/>
              </div>
            </div>
          </div>
          <div class='absolute flex flex-row w-1/5 h-1/12 bottom-0 right-1/6 bg-neutral-800/90 border-t-8 border-neutral-600 items-center justify-center text-4xl'>
            <div class={`mr-12 ${resumeOpen() ? 'text-neutral-400' : 'text-neutral-600 hover:text-neutral-500'}`} onclick={() => {
              setResumeOpen(!resumeOpen());
              setPortfolioOpen(false);
              setContactOpen(false);
              if (audioOn()) {
                clickAudioComponent.volume = 0.1;
                clickAudioComponent.play();
              }
            }}>
              <i class='ph-duotone ph-file-text'/>
            </div>
            <div class={`mr-12 ${portfolioOpen() ? 'text-neutral-400' : 'text-neutral-600 hover:text-neutral-500'}`} onclick={() => {
              setPortfolioOpen(!portfolioOpen());
              setContactOpen(false);
              setResumeOpen(false);
              if (audioOn()) {
                clickAudioComponent.volume = 0.1;
                clickAudioComponent.play();
              }
            }}>
              <i class='ph-duotone ph-briefcase'/>
            </div>
            <div class={`${contactOpen() ? 'text-neutral-400' : 'text-neutral-600 hover:text-neutral-500'}`} onclick={() => {
              setContactOpen(!contactOpen());
              setPortfolioOpen(false);
              setResumeOpen(false);
              if (audioOn()) {
                clickAudioComponent.volume = 0.1;
                clickAudioComponent.play();
              }
            }}>
              <i class='ph-duotone ph-phone'/>
            </div>
          </div>
        </Show>
        <Show when={contactOpen()}>
          <div class='absolute w-2/5 left-1/8 h-full flex items-center justify-center'>
            <div class='relative mt-[-90vh] mr-2 w-12 h-12 flex items-center justify-center'>
              <div class='flex flex-col group items-center justify-center text-neutral-600 hover:text-neutral-500' onclick={() => {
                setContactOpen(false);
                if (audioOn()) {
                  clickAudioComponent.volume = 0.1;
                  clickAudioComponent.play();
                }
              }}>
                <i class='ph-bold ph-arrow-u-up-left text-4xl'/>
                <div class='text-sm -mt-1'>
                  ESC
                </div>
              </div>
            </div>
            <div class='absolute w-100 -rotate-90 rotate-x-180 text-3xl text-neutral-700 right-[-22%] -top-10'>
              CONTACT ME
            </div>
            <div class='w-full h-full bg-neutral-800/90 flex flex-col items-start justify-start pt-[25%] px-8 border-x-14 border-neutral-600/50 text-neutral-400 text-4xl'>
              {/* TODO: Set up page contents */}
              <div class='pb-8 flex flex-col items-start'>
                Get in touch
                <div class='flex flex-row text-lg text-neutral-500 items-center'>
                  <i class='ph-duotone ph-map-pin-area pr-1' />
                  Hamilton, Canada
                </div>
              </div>
              <div class='text-lg pb-8 text-neutral-500'>
                Got project ideas or common interests? Let's connect!
              </div>
              <div class='flex flex-row items-start'>
                <i class='ph-duotone ph-envelope-simple mr-2 text-neutral-600 hover:text-neutral-500 text-6xl' onclick={() => {
                  navigator.clipboard.writeText('vanessa.chu@mail.mcgill.ca');
                }}/>
                <a href='https://www.linkedin.com/in/v-chu/' target='_blank' class='cursor-default mr-2' onclick={() => {
                  if (audioOn()) {
                    clickAudioComponent.volume = 0.1;
                    clickAudioComponent.play();
                  }
                }}>
                  <i class='ph-duotone ph-linkedin-logo text-neutral-600 hover:text-neutral-500 text-6xl'/>
                </a>
                <i class='ph-duotone ph-discord-logo text-neutral-600 hover:text-neutral-500 text-6xl' onclick={() => {
                  navigator.clipboard.writeText('gnehss');
                }}/>
              </div>
            </div>
          </div>
        </Show>
        <Show when={portfolioOpen()}>
          <div class='absolute w-2/5 left-1/8 h-full flex items-center justify-center'>
            <div class='relative mt-[-90vh] mr-2 w-12 h-12 flex items-center justify-center'>
              <div class='flex flex-col group items-center justify-center text-neutral-600 hover:text-neutral-500' onclick={() => {
                setPortfolioOpen(false);
                if (audioOn()) {
                  clickAudioComponent.volume = 0.1;
                  clickAudioComponent.play();
                }
              }}>
                <i class='ph-bold ph-arrow-u-up-left text-4xl'/>
                <div class='text-sm -mt-1'>
                  ESC
                </div>
              </div>
            </div>
            <div class='absolute w-100 -rotate-90 rotate-x-180 text-3xl text-neutral-700 right-[-22%] top-15'>
              PROJECT PORTFOLIO
            </div>
            <div class='w-full h-full bg-neutral-800/90 flex flex-col items-center justify-center px-8 border-x-14 border-neutral-600/50'>
              {/* TODO: Set up page contents */}
            </div>
          </div>
        </Show>
        <Show when={resumeOpen()} >
          <div class='absolute w-2/5 left-1/8 h-full flex items-center justify-center'>
            <div class='relative mt-[-90vh] mr-2 w-12 h-12 flex items-center justify-center'>
              <div class='flex flex-col group items-center justify-center text-neutral-600 hover:text-neutral-500' onclick={() => {
                setResumeOpen(false);
                if (audioOn()) {
                  clickAudioComponent.volume = 0.1;
                  clickAudioComponent.play();
                }
              }}>
                <i class='ph-bold ph-arrow-u-up-left text-4xl'/>
                <div class='text-sm -mt-1'>
                  ESC
                </div>
              </div>
            </div>
            <div class='absolute w-100 -rotate-90 rotate-x-180 text-3xl text-neutral-700 right-[-22%] top-30'>
              RESUME • GENERAL TECH
            </div>
            <div class='absolute w-12 h-12 scale-x-250 -rotate-5 transition duration-150 ease-in-out border-1 border-neutral-400 border-dashed rounded-full p-2 left-[10%] top-[21%]'/>
            <a href='https://macro.com/' target='_blank' class='cursor-default' onclick={() => {
              if (audioOn()) {
                clickAudioComponent.volume = 0.1;
                clickAudioComponent.play();
              }
            }}>
              <div class='absolute flex items-center justify-center max-w-24 hover:scale-120 transition duration-150 ease-in-out border-4 border-blue-600 rounded-full p-1 left-[10%] top-[20%]'>
                <div class='w-2 h-2 bg-white rounded-full'/>
              </div>
            </a>
            <div class='absolute w-12 h-12 scale-x-250 rotate-5 transition duration-150 ease-in-out border-1 border-neutral-400 border-dashed rounded-full p-2 left-[5%] top-[47%]'/>
            <a href='https://montreal.ubisoft.com/en/' target='_blank' class='cursor-default' onclick={() => {
              if (audioOn()) {
                clickAudioComponent.volume = 0.1;
                clickAudioComponent.play();
              }
            }}>
              <div class='absolute max-w-16 hover:scale-120 transition duration-150 ease-in-out border-4 border-violet-600 rounded-full p-1 left-[11%] top-[50.5%]'>
                <div class='w-2 h-2 bg-white rounded-full'/>
              </div>
            </a>
            <div class='absolute w-12 h-12 scale-x-250 -rotate-5 transition duration-150 ease-in-out border-1 border-neutral-400 border-dashed rounded-full p-2 right-[-1%] top-[60%]'/>
            <a href='https://mcgill.ca/' target='_blank' class='cursor-default' onclick={() => {
              if (audioOn()) {
                clickAudioComponent.volume = 0.1;
                clickAudioComponent.play();
              }
            }}>
              <div class='absolute max-w-12 hover:scale-120 transition duration-150 ease-in-out border-4 border-red-600 rounded-full p-1 right-[4%] top-[59.5%]'>
                <div class='w-2 h-2 bg-white rounded-full'/>
              </div>
            </a>
            <a href='https://gamedevmcgill.ca/' target='_blank' class='cursor-default' onclick={() => {
              if (audioOn()) {
                clickAudioComponent.volume = 0.1;
                clickAudioComponent.play();
              }
            }}>
              <div class='absolute max-w-10 hover:scale-120 transition duration-150 ease-in-out border-4 border-pink-600 rounded-full p-1 right-[2%] top-[63.5%]'>
                <div class='w-2 h-2 bg-white rounded-full'/>
              </div>
            </a>
            <div class='w-full h-full bg-neutral-800/90 flex flex-col items-center justify-center px-8 border-x-14 border-neutral-600/50'>
              <img src='../src/assets/resumeGT.png' class='max-w-full h-14/15 pb-4' draggable={false} />
              <div class='flex flex-row text-4xl'>
                <a href='https://www.linkedin.com/in/v-chu/' target='_blank' class='cursor-default' onclick={() => {
                  if (audioOn()) {
                    clickAudioComponent.volume = 0.1;
                    clickAudioComponent.play();
                  }
                }}>
                  <i class='ph-bold ph-linkedin-logo text-neutral-600 hover:text-neutral-500 pr-8' />
                </a>
                <a href='https://github.com/justness' target='_blank' class='cursor-default' onclick={() => {
                  if (audioOn()) {
                    clickAudioComponent.volume = 0.1;
                    clickAudioComponent.play();
                  }
                }}>
                  <i class='ph-bold ph-github-logo text-neutral-600 hover:text-neutral-500 pr-8' />
                </a>
                <a href='https://justness.itch.io/' target='_blank' class='cursor-default' onclick={() => {
                  if (audioOn()) {
                    clickAudioComponent.volume = 0.1;
                    clickAudioComponent.play();
                  }
                }}>
                  <i class='ph-bold ph-game-controller text-neutral-600 hover:text-neutral-500 pr-8' />
                </a>
                <a href='../src/assets/resumeGT.pdf' download="NessChu_Resume.pdf" class='cursor-default' onclick={() => {
                  if (audioOn()) {
                    clickAudioComponent.volume = 0.1;
                    clickAudioComponent.play();
                  }
                }}>
                  <i class='ph-bold ph-download-simple text-neutral-600 hover:text-neutral-500 pr-4' />
                </a>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </>
  )
}

export default App;
