export default function Warning ({text}) {
    return(
        <div className="bg-danger w-50 rounded mt-1">
            <p className="m-0 p-1 text-uppercase text-center text-white fw-bold">{text} Inválido</p>
        </div>
    )
}