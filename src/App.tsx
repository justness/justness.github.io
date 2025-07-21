import { createEffect, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import bkgAudio from './assets/BackbayLounge.mp3';
import gearAudio from './assets/gear.wav';
import clickAudio from './assets/click.ogg';
import keyPressAudio from './assets/keyPress.ogg';
import tapAudio from './assets/ceramicTap.wav';

function App() {
  const currentTime = new Date();
  const [scrollProgress, setScrollProgress] = createSignal<number>(2.5);
  const [portfolioOpen, setPortfolioOpen] = createSignal<boolean>(false);
  const [contactOpen, setContactOpen] = createSignal<boolean>(false);
  const [resumeOpen, setResumeOpen] = createSignal<boolean>(false);

  const [initialDarkness, setInitialDarkness] = createSignal<boolean>(true);
  const [npcPfp, setNpcPfp] = createSignal<string>('');
  const [showSuccess, setShowSuccess] = createSignal<boolean>(false);
  const [showFailure, setShowFailure] = createSignal<boolean>(false);
  const [showSettings, setShowSettings] = createSignal<boolean>(false);
  const [audioOn, setAudioOn] = createSignal<boolean>(true);
  const [queuedBarks, setQueuedBarks] = createSignal<string[]>([]);
  const [removingBark, setRemovingBark] = createSignal<boolean>(false);

  let bkgAudioComponent!: HTMLAudioElement;
  let gearAudioComponent!: HTMLAudioElement;
  let clickAudioComponent!: HTMLAudioElement;
  let keyPressAudioComponent!: HTMLAudioElement;
  let tapAudioComponent!: HTMLAudioElement;

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
        <div class='w-full h-full flex items-center justify-center bg-black'>
          <Show when={!initialDarkness()}>
            <div class='w-full h-full mt-[40%] flex items-center justify-center origin-center scale-x-225'>
              <div class='w-[75vh] h-3/4 bg-neutral-600 bg-center bg-repeat bg-auto rotate-45 origin-center' style={{
                'background-image': "url('../src/assets/grass.jpg')",
              }}/>
            </div>
            <div class='absolute w-1/2 h-1/3 bg-bottom bg-repeat-x bg-contain -skew-y-24 mr-[50vw] mb-[6.5%]' style={{
              'background-image': "url('../src/assets/brickWall.jpg')",
            }}/>
            <div class='absolute w-1/2 h-1/3 bg-bottom bg-repeat-x bg-contain skew-y-24 ml-[50vw] mb-[6.5%]' style={{
              'background-image': "url('../src/assets/fence.png')",
            }}/>
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
                // TODO: Reset state

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
            background: 'rgba(0, 0, 0, 0) radial-gradient(ellipse at top, rgba(0, 0, 0, 0) 60%, rgba(255, 115, 115, 1) 100%)',
          }}/>
          <div class='w-full h-full absolute' style={{
            background: 'rgba(0, 0, 0, 0) radial-gradient(ellipse at top, rgba(0, 0, 0, 0) 60%, rgba(115, 0, 0, 1) 100%)',
          }}/>
        </Show>
        <Show when={showSuccess()}>
          <div class='w-full h-full absolute' style={{
            background: 'rgba(0, 0, 0, 0) radial-gradient(ellipse at top, rgba(0, 0, 0, 0) 60%, rgba(255, 115, 115, 1) 100%)',
          }}/>
          <div class='w-full h-full absolute' style={{
            background: 'rgba(0, 0, 0, 0) radial-gradient(ellipse at top, rgba(0, 0, 0, 0) 60%, rgba(115, 255, 115, 1) 100%)',
          }}/>
          
        </Show>
        {/* TODO: Replace placeholder image */}
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
        {/* <div class='absolute flex w-1/12 h-1/4 left-1/11 bottom-0 border-14 border-neutral-800/90 items-center justify-center text-red-400'>
          Cats pic
        </div> */}
        <div class='absolute w-1/4 h-9/10 right-1/10 bg-neutral-800/90 px-16 py-36 border-14 border-t-0 border-neutral-400/50 border-b-8 border-b-neutral-600'>
          {/* TODO: Replace placeholder image */}
          <Show when={npcPfp().length > 0}>
            <div title='https://picrew.me/ja/image_maker/197705' class='absolute bg-clip-content bg-no-repeat bg-cover bg-center bg-lime-950 start-[-25%] w-1/3 h-1/4 border-14 border-neutral-900' style={{
              'background-image': `url(${npcPfp()})`,
            }}/>
          </Show>
          <div class='flex flex-row w-full h-full'>
            <div class='w-full h-9/10 overflow-hidden overflow-y-scroll' onScroll={(e) => {
              // TODO: Fix for varying screen sizes
              setScrollProgress(((e.currentTarget.scrollTop / (e.currentTarget.scrollHeight - e.currentTarget.clientHeight)) * 100)+4);
            }}>
              <div class='font-serif text-neutral-600 pb-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam velit lectus, finibus ac accumsan et, tincidunt eu sem.
              </div>
              <div class='font-serif text-neutral-600 pb-2'>
                Aliquam turpis ex, porta vitae massa a, sagittis dapibus diam. Integer rutrum turpis dolor, et convallis nisi aliquam ut. Sed nec orci quis nulla tempus porta.
              </div>
              <div class='font-serif text-neutral-600 pb-2'>
                Fusce nec odio vitae mi eleifend mattis ac id nunc. Donec vestibulum urna in augue ullamcorper blandit. Maecenas erat turpis, pulvinar ut dictum at, ullamcorper vel libero. In hac habitasse platea dictumst. Praesent laoreet erat nec pulvinar congue.
              </div>
              <div class='font-serif text-neutral-600 pb-2'>
                Fusce varius mollis lacus, egestas malesuada elit gravida sit amet.
              </div>
              <div class='font-serif text-neutral-400'>
                Fusce blandit gravida tellus, ut blandit nulla vestibulum at. Mauris a ante et nisl tempor rutrum nec sit amet felis.
              </div>
            </div>
            <div class='h-9/10'>
              <div class='flex flex-col h-full items-center'>
                <i class='ph-bold ph-caret-up text-neutral-500'/>
                <div class={`absolute w-3 h-3 rounded-full bg-neutral-200 justify-self-center`} style={{
                  'margin-top': (scrollProgress()) +'%',
                }}/>
                <div class='w-[1px] h-full rounded bg-neutral-600'/>
                <i class='ph-bold ph-caret-down text-neutral-500'/>
              </div>
            </div>
          </div>
        </div>
        <div class='absolute flex flex-col w-1/6 h-1/8 bg-neutral-900 right-0 bottom-0 border-t-8 border-neutral-600 justify-center items-center text-neutral-400'>
          <div class='flex flex-row items-center pb-2'>
            <i class='ph-duotone ph-diamonds-four pr-1'/>
            <div class='pr-4'>
              {(currentTime.getMonth()+1)+'.00'}
            </div>
            <div class='text-center text-4xl pr-4'>
              {currentTime.getHours()+':'+(currentTime.getMinutes() < 10 ? '0' : '')+currentTime.getMinutes()}
            </div>
            <div>
              {'Day '+currentTime.getDate()}
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
          {/* <div class={`mr-12 ${!portfolioOpen() && !contactOpen() && !resumeOpen() ? 'text-neutral-400' : 'text-neutral-600 hover:text-neutral-500'}`} onclick={() => {
            setPortfolioOpen(false);
            setContactOpen(false);
            setResumeOpen(false);
            if (audioOn()) {
              clickAudioComponent.volume = 0.1;
              clickAudioComponent.play();
            }
          }}>
            <i class='ph-duotone ph-house'/>
          </div> */}
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
        <Show when={resumeOpen()} >
          <div class='absolute w-2/5 h-full flex items-center justify-center'>
            <div class='relative mt-[-90vh] mr-2 w-12 h-12 flex items-center justify-center'>
              <i class='ph-bold ph-arrow-u-up-left text-neutral-600 hover:text-neutral-500 text-4xl' onclick={() => {
                setResumeOpen(false);
                if (audioOn()) {
                  clickAudioComponent.volume = 0.1;
                  clickAudioComponent.play();
                }
              }} />
            </div>
            <div class='absolute max-w-24 hover:scale-120 transition duration-150 ease-in-out bg-blue-100 rounded-lg p-2 left-[10%] top-[20%] -rotate-5'>
              <a href='https://macro.com/' target='_blank' class='cursor-default' onclick={() => {
                if (audioOn()) {
                  clickAudioComponent.volume = 0.1;
                  clickAudioComponent.play();
                }
              }}>
                <img src='../src/assets/macro.svg' />
              </a>
            </div>
            <div class='absolute max-w-16 hover:scale-120 transition duration-150 ease-in-out bg-neutral-200 rounded-lg p-2 left-[10%] top-[50%] -rotate-5'>
              <a href='https://montreal.ubisoft.com/en/' target='_blank' class='cursor-default' onclick={() => {
                if (audioOn()) {
                  clickAudioComponent.volume = 0.1;
                  clickAudioComponent.play();
                }
              }}>
                <img src='../src/assets/ubisoft.svg' />
              </a>
            </div>
            <div class='absolute max-w-12 hover:scale-120 transition duration-150 ease-in-out bg-red-200 rounded-lg p-2 right-[4%] top-[58%] rotate-5'>
              <a href='https://mcgill.ca/' target='_blank' class='cursor-default' onclick={() => {
                if (audioOn()) {
                  clickAudioComponent.volume = 0.1;
                  clickAudioComponent.play();
                }
              }}>
                <img src='../src/assets/mcgill.png' />
              </a>
            </div>
            <div class='absolute max-w-10 hover:scale-120 transition duration-150 ease-in-out bg-pink-200 rounded-lg p-2 right-[3%] top-[64%] rotate-5'>
              <a href='https://gamedevmcgill.ca/' target='_blank' class='cursor-default' onclick={() => {
                if (audioOn()) {
                  clickAudioComponent.volume = 0.1;
                  clickAudioComponent.play();
                }
              }}>
                <img src='../src/assets/gdm.png' />
              </a>
            </div>
            <div class='w-full h-full bg-neutral-800/90 flex flex-col items-center justify-center px-8 border-x-14 border-neutral-600/50'>
              <img src='../src/assets/resumeGT.png' class='max-w-full h-14/15 pb-4' />
              <div class='flex flex-row text-4xl'>
                <a href='https://www.linkedin.com/in/v-chu/' target='_blank' class='cursor-default' onclick={() => {
                  if (audioOn()) {
                    clickAudioComponent.volume = 0.1;
                    clickAudioComponent.play();
                  }
                }}>
                  <i class='ph-bold ph-linkedin-logo text-neutral-600 hover:text-neutral-500 pr-4' />
                </a>
                <a href='https://github.com/justness' target='_blank' class='cursor-default' onclick={() => {
                  if (audioOn()) {
                    clickAudioComponent.volume = 0.1;
                    clickAudioComponent.play();
                  }
                }}>
                  <i class='ph-bold ph-github-logo text-neutral-600 hover:text-neutral-500 pr-4' />
                </a>
                <a href='https://justness.itch.io/' target='_blank' class='cursor-default' onclick={() => {
                  if (audioOn()) {
                    clickAudioComponent.volume = 0.1;
                    clickAudioComponent.play();
                  }
                }}>
                  <i class='ph-bold ph-game-controller text-neutral-600 hover:text-neutral-500 pr-4' />
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
