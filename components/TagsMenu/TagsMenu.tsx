"use client";

import css from "./TagsMenu.module.css"
import { useState } from "react";
import Link from "next/link";
import { tags } from "@/constans/tags";



const TagsMenu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className={css.menuContainer}>
            <button onClick={toggle} className={css.menuButton}>
                Notes ▾
            </button>
            {isOpen && (<ul className={css.menuList}>
                {tags.map((element) => {
                    return <li key={element} className={css.menuItem} onClick={toggle}>
                        <Link className={css.menuLink} href={element === "All" ? "/notes/filter/All" : `/notes/filter/${element}`} >{element}</Link>
                    </li>
                })}
            </ul>)}
        </div>

    )
}

export default TagsMenu;