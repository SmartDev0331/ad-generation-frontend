import Button from '@/components/ui/Button';


interface DropsetProps {
  label?: string;
  aLabel?: string;
  icon?: JSX.Element;
  func?: () => void;
}

const DropSet = ({ label, aLabel, icon, func }: DropsetProps) => {


  return (
    <div className="flex flex-col bg-slate-600 px-4 pt-2 rounded-lg transition duration-1000 ">
      <div className="flex justify-start" >
        {icon}
        <span>{label}</span>
      </div>
      <div className='h-[0.5px] bg-slate-900'></div>
      <div className='flex justify-center py-2'>
        <button className='bg-purple-600 text-white px-8 rounded-md' onClick={func}>{aLabel}</button>
      </div>
    </div>
  )
}

export default DropSet;