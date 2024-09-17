import getConfig from 'next/config';
import Image from 'next/image';
import IconButton from '@/components/IconButton';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import ImageEditor from '@/components/ImageEditor';
const { publicRuntimeConfig } = getConfig();

export default function Home() {


  return (
    <div className='w-full max-w-[900px]'>

      <ImageEditor>
      </ImageEditor>
    </div>
  );
}
