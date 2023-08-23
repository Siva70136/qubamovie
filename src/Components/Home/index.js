import { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader'
import './index.css'

class Home extends Component {
    state = { list: [], isloading: false }

    componentDidMount() {
        this.getShowDetails();
    }
    getShowDetails = async () => {
        this.setState({ isloading: true });
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
        if (response.ok === true) {
            const data = await response.json();
            const updatedData = data.map(each => ({
                id: each.show.id,
                name: each.show.name,
                type: each.show.type,
                language: each.show.language,
                geners: each.show.genres,
                status: each.show.status,
                runtime: each.show.runtime,
                schedule: each.show.schedule,
                rating: each.show.rating.average,
                image: each.show.image,
                summary: each.show.summary,
                

            }))
            console.log(updatedData);
            this.setState({
                isloading: false,
                list: updatedData
            })

        }

    }
    render() {
        const { list, isloading } = this.state
        return (

            <div className='app-container'>
                <div className='nav-container'>
                    <div className="navbar">
                        <Link to="/">
                            <img className="logo" src="https://cdn-icons-png.flaticon.com/128/2828/2828307.png" alt='logo' />
                        </Link>
                        <button className="button buy">Info</button>
                    </div>

                </div>
                {isloading ?
                    <div className="loader-container" data-testid="loader">
                        <Loader type="ThreeDots" color="#4f46e5" height="5" width="2" />
                    </div> :
                    <div className='table-container'>
                        <table className='table'>
                            <tr className='row'>
                                <th className='head'>Show</th>
                                <th className='more'>More Info</th>
                            </tr>
                            {list.map(each => {
                                return (<tr className='row'>
                                    <th className='name'>{each.name}</th>
                                    <th className='btn'>
                                        <Link to={`info/${each.id}`} >
                                            <button key={`${each.id}`} className='button'>More</button>
                                        </Link></th>
                                </tr>)
                            })}

                        </table>
                    </div>
                }
            </div>
        )
    }
}
export default Home;