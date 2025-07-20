import { createSignal } from "solid-js";

function App() {
  const currentTime = new Date();
  const [scrollProgress, setScrollProgress] = createSignal<number>(0);

  return (
    <>
      <div class='w-full h-full flex select-none'>
        <div class='w-full h-full bg-black'/>
        <div class='absolute flex w-1/12 h-1/4 left-0 bottom-0 border-14 border-neutral-800/50 items-center justify-center text-red-400'>
          Profile pic
        </div>
        <div class='absolute flex w-1/12 h-1/4 left-1/11 bottom-0 border-14 border-neutral-800/50 items-center justify-center text-red-400'>
          Cats pic
        </div>
        <div class='absolute w-1/4 h-9/10 right-1/10 bg-neutral-800/50 px-16 py-36 border-14 border-t-0 border-neutral-400/50 border-b-8 border-b-neutral-600'>
          <div class='absolute start-[-25%] w-1/3 h-1/4 border-14 border-neutral-900'/>
          <div class='flex flex-row w-full h-full'>
            <div class='w-full h-8/10 overflow-hidden overflow-y-scroll' onScroll={(e) => {
              setScrollProgress((e.currentTarget.scrollTop / (e.currentTarget.scrollHeight - e.currentTarget.clientHeight)) * 95);
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
            <div class='h-14/15'>
              <div class='absolute w-3 h-3 rounded-full bg-white justify-self-center'style={{
                'margin-top': (scrollProgress()) +'%',
              }}/>
              <div class='flex flex-col h-full items-center'>
                <i class='ph-bold ph-caret-up text-neutral-500'/>
                <div class='w-[1px] h-8/10  rounded bg-neutral-600'/>
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
              {currentTime.getHours()+':'+currentTime.getMinutes()}
            </div>
            <div>
              {'Day '+currentTime.getDate()}
            </div>
          </div>
          <div class='flex flex-row items-center p-1'>
            <div class='scale-x-[-1] pl-2'>
              <div class='border border-neutral-600 py-1 px-2 rounded'>
                <i class='ph-duotone ph-hand-pointing'/>
              </div>
            </div>
            <div class='border border-neutral-600 py-1 px-2 rounded'>
              <i class='ph-duotone ph-hand-pointing'/>
            </div>
          </div>
        </div>
        <div class='absolute flex flex-row w-1/5 h-1/12 bottom-0 right-1/6 bg-neutral-800/50 border-t-8 border-neutral-600 items-center justify-center text-4xl'>
          <div class='mr-12 text-neutral-400' onclick={() => {
            window.location.href = window.location.origin+'/';
          }}>
            <i class='ph-duotone ph-house'/>
          </div>
          <div class='mr-12 text-neutral-600' onclick={() => {
            window.location.href = window.location.origin+'/portfolio';
          }}>
            <i class='ph-duotone ph-briefcase'/>
          </div>
          <div class='text-neutral-600' onclick={() => {
            window.location.href = window.location.origin+'/contact';
          }}>
            <i class='ph-duotone ph-phone'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
