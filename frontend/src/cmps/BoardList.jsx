import { BoardPreview } from './BoardPreview'
import { BoardCreate } from './BoardCreate'

export function BoardList({ boards }) {
    return (
        <section className="board-list">

            <div className="new-board">
                <BoardCreate />
            </div>

            {boards.map(board => <div key={board._id}><BoardPreview board={board} /></div>)}

        </section>
    )
}