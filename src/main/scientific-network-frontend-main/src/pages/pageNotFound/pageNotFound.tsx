import { useParams } from "react-router-dom"

export default function PageNotFound() {
    const { path } = useParams();
    return (
        <p>There is no such page as "/{path}"</p>
    )
}