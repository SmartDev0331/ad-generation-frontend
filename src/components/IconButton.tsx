import { ReactNode } from "react";

interface Props {
  onClick?: () => void,
  activate?: boolean,
  disabled?: boolean,
  title?: string,
  children?: ReactNode
}

const IconButton = ({ onClick, activate, disabled, title, children }: Props) => {
  return (
    <div>
      <button className="" title={title} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

export default IconButton;