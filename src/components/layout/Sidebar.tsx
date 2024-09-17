'use client'
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ClearIcon from '@mui/icons-material/Clear';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import SubMenu from './Sidebar/SubMenu';
import SideBarItem from './Sidebar/SideBarItem';
import { useAtom } from 'jotai';
import { sideItemNum } from '@/context/sideItemNum';
import { srcAtom } from '@/context/srcAtom';
import DropSet from './Sidebar/DropSet';
import FormatIndentIncreaseSharpIcon from '@mui/icons-material/FormatIndentIncreaseSharp';
import DropPrompt from './Sidebar/DropPrompt';
import { removeBackground } from '@/app/api/MoreAction';
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
          <SideBarItem icon={<WallpaperIcon className='text-sky-400' />} label='Replace Background' setSelNum={setSelNum} number={1} />
          {selNum === 1 ? <DropPrompt icon={<FormatIndentIncreaseSharpIcon className='text-sky-400' />} label="" /> : <></>}
          <SideBarItem icon={<AddToPhotosIcon className='text-sky-400' />} label='Blend to Image' setSelNum={setSelNum} number={2} />
          {selNum === 2 ? <DropPrompt icon={<FormatIndentIncreaseSharpIcon className='text-sky-400' />} label="" /> : <></>}
          <SideBarItem icon={<TextIncreaseIcon className='text-sky-400' />} label='Add Text' setSelNum={setSelNum} number={3} />
          {selNum === 3 ? <DropPrompt icon={<FormatIndentIncreaseSharpIcon className='text-sky-400' />} label="" /> : <></>}
        </div>

        {/* AI more action */}
        <div className='flex flex-col justify-start gap-2 text-[13px]'>
          <SubMenu label='More Action' className='text-white' />
          <SideBarItem icon={<ClearIcon className='text-yellow-400' />} label='Remove Background' setSelNum={setSelNum} number={4} />
          {selNum === 4 ? <DropSet label={"Remove Background"} aLabel={"Remove"} icon={<FormatIndentIncreaseSharpIcon className='text-slate-400' />} func={removeBg} /> : <></>}
          <SideBarItem icon={<AddToPhotosIcon className='text-yellow-400' />} label='Erase Object' setSelNum={setSelNum} number={5} />
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