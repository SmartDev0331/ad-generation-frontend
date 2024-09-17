
interface SideBarItemProps {
  children?: React.ReactNode;
  icon?: JSX.Element;
  label?: string;
  setSelNum: (setNum: number) => void;
  number: number
}

const SideBarItem = ({ children, icon, label, setSelNum, number }: SideBarItemProps) => {

  const changeSelNum = () => {
    setSelNum(number);
    console.log("sel------>", number);
  }


  return (
    <div className="flex flex-row gap-3 cursor-pointer" onClick={changeSelNum}>
      <figure>{icon}</figure>
      <span>{label}</span>
    </div>
  )
}

export default SideBarItem;