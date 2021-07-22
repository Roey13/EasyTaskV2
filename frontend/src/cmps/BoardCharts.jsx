import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { setBoard } from '../store/actions/boardActions.js'
import loading from '../assets/imgs/loading.gif'

class _BoardCharts extends React.Component {

    state = {
        groupsTitles: [],
        tasksAmount: [],
        tasksPerMember: {}
    }

    componentDidMount() {
        this.createData()
    }

    createData = () => {
        const board = this.props.board

        let tasksAmount = []
        let roeyCount = 0
        let noaCount = 0
        let rotemCount = 0

        const groupsTitles = board.groups.map((group) => {
            const tasks = group.tasks
            let tasksCount = 0
            if (!tasks) return
            tasks.forEach((task) => {
                ++tasksCount
                const members = task.members
                if (!members) return
                members.forEach((member) => {
                    if (member.fullname === 'Roey Barda') ++roeyCount
                    if (member.fullname === 'Noa Kaplan') ++noaCount
                    if (member.fullname === 'Rotem Bar') ++rotemCount
                })
            })
            tasksAmount.push(tasksCount)
            return group.title
        })
        const tasksPerMember = { "Roey": roeyCount, "Noa": noaCount, "Rotem": rotemCount }
        this.setState({ tasksPerMember })
        this.setState({ groupsTitles, tasksAmount })
    }

    render() {
        const { onToggleCharts } = this.props
        const board = this.props.currBoard
        const { groupsTitles, tasksAmount, tasksPerMember } = this.state
        if (!board || !groupsTitles && !tasksAmount && !tasksPerMember) return (
                <div className="loading">
                    <img className='loading-img' src={loading} />
                </div>
            )

        const tasksPerGroupData = {
            labels: Object.values(this.state.groupsTitles),
            datasets: [
                {
                    label: 'Tasks Per Group',
                    data: Object.values(this.state.tasksAmount),
                    backgroundColor: [
                        '#ff595e',
                        '#ffca3a',
                        '#8ac926',
                        '#6a4c93',
                        '#a3cef1',
                        '#ea3546',
                    ],
                    borderWidth: 0,
                }
            ]
        }

        const tasksPerMemberData = {
            labels: Object.keys(tasksPerMember),

            datasets: [
                {
                    label: 'Tasks Per Member',
                    data: Object.values(tasksPerMember),
                    backgroundColor: [
                        '#ff595e',
                        '#ffca3a',
                        '#8ac926',
                        '#6a4c93',
                        '#a3cef1',
                        '#ea3546',
                    ],
                    borderWidth: 0,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    },
                }
            ]
        }
        return (
            <section className="board-charts">
                <div className='header-title'>Statistics</div>
                <div className='chart-container a'>
                    <div className='title'>Tasks Per Group</div>
                    <Doughnut className='chart' options={{ maintainAspectRatio: false }} data={tasksPerGroupData} />
                </div>
                <div className='chart-container b'>
                    <div className='title'>Tasks Per Member</div>
                    <Bar
                        className='chart'
                        data={tasksPerMemberData}
                        options={{ maintainAspectRatio: false }} />
                </div>
                <button className="close-chart" onClick={onToggleCharts}>Close X</button>
            </section>
        )
    }

}


function mapStateToProps(state) {
    return {
        currBoard: state.boardModule.currBoard
    }
}
const mapDispatchToProps = {
    setBoard
}

export const BoardCharts = connect(mapStateToProps, mapDispatchToProps)(_BoardCharts)