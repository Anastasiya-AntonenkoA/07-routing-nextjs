import { tags } from "@/constans/tags"
import css from "./SidebarNotes.module.css"
import Link from "next/link"

export default function SidebarNotes() {
    return (<ul className={css.menuList}>

        {tags.map((element) => {
            return <li key={element} className={css.menuItem}>
                <Link className={css.menuLink} href={element === "All" ? "/notes/filter/All" : `/notes/filter/${element}`} >{element}</Link>
            </li>
        })}
    </ul>)
}