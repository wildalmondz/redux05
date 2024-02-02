// ChildComponent.js
export default function ChildComponent({ type, slug, id }){
    return (
        <>
            <h1>{type}</h1>
            <h4>{slug}</h4>
            <h4>{id}</h4>
        </>
    )
};