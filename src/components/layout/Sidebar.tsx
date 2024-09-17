'use client'
import SubMenu from './Sidebar/SubMenu';
import SideBarItem from './Sidebar/SideBarItem';
import { useAtom } from 'jotai';
import { sideItemNum } from '@/context/sideItemNum';
import { srcAtom } from '@/context/srcAtom';
import DropSet from './Sidebar/DropSet';
import DropPrompt from './Sidebar/DropPrompt';
import { removeBackground } from '@/app/api/moreAction';
import { LoadingIcon } from '../LoadingIcon';
import { useState } from 'react';

const Sidebar = () => {

  const [selNum, setSelNum] = useAtom(sideItemNum);
  const [removeImg, setRemoveImg] = useAtom(srcAtom);
  const [isloading, setIsLoading] = useState<boolean>(false);

  const dropdown = () => {

  }

  console.log('selNum------>', selNum);

  async function removeBg() {
    setIsLoading(true)
    console.log("removeBg----------->", removeImg);
    const response = await removeBackground(removeImg);
    console.log('resultBg------------>', response);
    setIsLoading(false)
  }



  return (
    <div className="flex fixed justify-between pl-3 pt-8 w-72 mt-[80px] text-lg font-semibold bg-slate-800 h-full">
      <div className="flex flex-col justify-start gap-8 " >

        {/*   Generative AI    */}
        <div className='flex flex-col justify-start gap-5 text-[16px]'>
          <SubMenu label='Generative AI' className="text-white" />
          <SideBarItem label='Replace Background' setSelNum={setSelNum} number={1} />
          {selNum === 1 ? <DropPrompt label="" /> : <></>}
          <SideBarItem label='Blend to Image' setSelNum={setSelNum} number={2} />
          {selNum === 2 ? <DropPrompt label="" /> : <></>}
          <SideBarItem label='Add Text' setSelNum={setSelNum} number={3} />
          {selNum === 3 ? <DropPrompt label="" /> : <></>}
        </div>

        {/* AI more action */}
        <div className='flex flex-col justify-start gap-2 text-[13px]'>
          <SubMenu label='More Action' className='text-white' />
          <SideBarItem label='Remove Background' setSelNum={setSelNum} number={4} />
          {selNum === 4 ? <DropSet label={"Remove Background"} aLabel={"Remove"} func={removeBg} /> : <></>}
          <SideBarItem label='Erase Object' setSelNum={setSelNum} number={5} />
        </div>

      </div>
      {
        isloading && (
          <div className='absoulte w-full h-full flex items-center'>
            <LoadingIcon />
          </div>
        )
      }
    </div>
  )
}

export default Sidebar;