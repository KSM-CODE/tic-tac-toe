type Player= 'X' | 'O' | 'Both' | null;
export default function Squares({value, onClick, winner}:{winner:Player, value:Player, onClick:()=> void}) {
    if(!value){
        return <button className="square" onClick={onClick}  disabled={Boolean(winner)}></button>
    }
    return <button className={`square_${value.toLocaleLowerCase()}`} disabled>{value}</button>
}
