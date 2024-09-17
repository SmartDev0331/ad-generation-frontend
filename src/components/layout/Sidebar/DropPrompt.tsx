
interface DropPrompt {
  label?: string;
  icon?: JSX.Element;
}

const DropPrompt = ({ label, icon }: DropPrompt) => {
  return (
    <div className="flex flex-col rounded-lg text-[14px]">
      <textarea className="bg-slate-700 outline-none p-2 overflow-ellipsis rounded-md" />
      <div className="flex justify-center py-1">
        <button className="px-8 py-1 text-white rounded-lg bg-purple-600">Prompt</button>
      </div>
    </div>
  )
}

export default DropPrompt;