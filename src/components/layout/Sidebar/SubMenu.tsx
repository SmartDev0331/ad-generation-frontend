
interface SubMenu {
  children?: React.ReactNode;
  label?: string;
  icon?: JSX.Element;
  className?: string;
}

const SubMenu = ({ children, label, icon, className }: SubMenu) => {
  return (
    <div className={"flex flex-row gap-4 text-lg " + className}>
      <figure>{label}</figure>
      <span>{icon}</span>
    </div>
  )
}

export default SubMenu;