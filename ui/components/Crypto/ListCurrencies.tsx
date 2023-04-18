import { useState, useEffect, useRef } from 'react';
import { currency, propsConverterList } from './types';

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function({currencies, onSelect, onClose}: propsConverterList) {

    const [match, setMatch] = useState<currency[]>(currencies);
    const [selected, setSelected] = useState<number>(0);
    const ref = useRef<HTMLInputElement>(null);
    const ul = useRef<HTMLUListElement>(null);
    const li = useRef<HTMLLIElement>(null);

    const filter = (search: string) =>  {
        const filtered = currencies.filter(c =>
            c.symb.toUpperCase().includes(search.toUpperCase())
                ||
            c.name.toLocaleUpperCase().includes(search.toUpperCase())
        );

        setMatch(filtered);
        setSelected(0);
    };

    const handleSelect = (c: currency) => {
        onSelect(c);
        onClose();
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", e => handleClickOutside(e));

        return () => {
            document.removeEventListener("mousedown", e => handleClickOutside(e));
        };
      }, [ref]);

    return (
        <div className='listCurrencies fixed p-10 flex flex-col items-center justify-start w-[40vw] top-[10vh] left-[30vw] rounded-2xl border-2 border-solid z-[1000] bg-white' ref={ref}>
                <input
                    autoFocus
                    type="text"
                    onChange={ e => filter(e.target.value) }
                    className='w-full listCurrenciesInput h-[5vh] rounded-xl mt-[1vh] mb-[1vh] outline-none border border-gray-300 font-poppins p-3'
                    placeholder='Search by token or project name'
                 />

                <div className='hr w-full h-0'></div>

                <ul className='listCurrenciesUl w-full overflow-y-scroll h-[55vh] font-poppins' ref={ul}>
                    { match.map((c: currency, i: number) =>
                        <li
                            key={c.id}
                            className="{i == selected ? 'active' : ''} flex flex-row items-center justify-start h-[11vh] p-[0.5vw] cursor-pointer "
                            onClick={ e => handleSelect(c) }
                            onMouseEnter={ e => setSelected(i) }
                            ref={ i == selected ? li : null }
                        >
                            <img src={c.img} alt={c.symb} className="w-[5vh] mr-[2vh]"></img>
                            <div className='wrapper w-full flex flex-row items-center justify-between'>
                                <p className="flex flex-col justify-evenly odd:items-start even:items-end font-poppins">
                                    <span>{ c.symb }</span>
                                    <span>{ c.name }</span>
                                </p>
                                <p className="flex flex-col justify-evenly odd:items-start even:items-end font-poppins">
                                    <span>{ c.price }$</span>
                                </p>
                            </div>
                        </li>
                    ) }
                </ul>

                <div className='hr w-full h-0'></div>

            </div>
    );
}
