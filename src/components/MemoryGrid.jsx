import { decodeEntity } from 'html-entities';

function MemoryGrid({ handleClick, data }) {
  return (
    <ul className="mx-auto w-full max-w-4xl py-5 sm:py-12 grid gap-4 auto-rows-[minmax(150px,auto)] grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
      {data.map((emoji, index) => (
        <li
          key={index}
          className="group bg-slate-200 rounded-xl hover:bg-amber-100">
          <button
            className="w-full h-full text-7xl cursor-pointer "
            onClick={() => handleClick(emoji.name, index)}>
            {decodeEntity(emoji.htmlCode[0])}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default MemoryGrid;