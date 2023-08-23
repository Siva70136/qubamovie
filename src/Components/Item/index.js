import { useState, useEffect } from 'react';
import Loader from 'react-loader'
import { Link, useParams } from 'react-router-dom'

import './index.css'

const Item = (props) => {
    //state = { list:{}, isloading: false }
    const [list, setList] = useState({
        "geners"
            :
            ['Comedy']
        , "id"
            :
            31428
        , "image"
            :
            { medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/155/388118.jpg', original: 'https://static.tvmaze.com/uploads/images/original_untouched/155/388118.jpg' }
        , "language"
            :
            "English"
        , "name"
            :
            "All Night"
        , "rating"
            :
            8
        , "runtime"
            :
            null
        , "schedule": { time: '', days: Array(0) },
        "status": "Ended",
        "summary": "<p>After their graduation, the class of 2018 gathers to celebrate their last night together at their local rec center for \"Grad Night,\" an all-night party with dancing, karaoke, games—and a rule that no one can come in or out for twelve full hours. For most the night signals their last chance to accomplish some high school dream: Nerdy Cody wants to make his mark on the school, and popular Roni wants to finally lose her virginity to her boyfriend Oz. Valedictorian Melinda plans to sneakily sell alcohol to her classmates at the party to pay her tuition, and every-girl Deanna gets ready to finally admit her feelings for her best friend Fig, who only has eyes for Roni. As the night goes on, the kids' quests overlap, intertwine, and -in some cases- implode. What would you do with your last night in high school?</p>",
        " type": "Scripted"
    });
    const [isLoad, setLoad] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        const getShowDetails = async () => {
            setLoad(true);
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
                    premiered:each.show.premiered,

                }))

                //const id = match.params.id;
                const item = updatedData.filter(each => {
                    return each.id == id;
                })
                setLoad(false);
                setList(item[0]);

            }


        }
        getShowDetails();
    }, []);

    const { type, geners, image, language, name, rating, runtime,premiered ,schedule, status, summary } = list
    console.log(image)
    console.log(rating)
    return (

        <div className='main-container'>
            <div className='nav-container'>
                <div className="navbar">
                    <Link to="/">
                        <img className="logo" src="https://cdn-icons-png.flaticon.com/128/2828/2828307.png" alt='logo' />
                    </Link>
                    <button className="button buy">Info</button>
                </div>

            </div>
            {isLoad ?
                <div className="loader-container" data-testid="loader">
                    <Loader type="ThreeDots" color="#4f46e5" height="5" width="2" />
                </div> :
                <div className='card'>
                    <div className='container'>

                        <div className='md-image-container'>
                            <img src={image != null && image["original"]} alt={`${name} Not Found`} className='image' />

                        </div>
                        <div className='sm-image-container'>
                            <img src={image != null && image["medium"]} alt={`${name} Not Found`} className='image' />

                        </div>
                        <div className='data-container'>
                            <ul className='geners-container'>
                                {geners.map(each => {
                                    return <li className='gener'>{each}</li>
                                })}
                            </ul>
                            <div className='summary'>{summary}</div>
                            <table className='details'>
                                <tr>
                                    <th className='title'>Type</th>
                                    <th className='value'>{type}</th>
                                </tr>
                                <tr>
                                    <th className='title'>Language</th>
                                    <th className='value'>{language}</th>
                                </tr>
                                <tr>
                                    <th className='title'>Rating</th>
                                    <th className='value'>{rating}</th>
                                </tr>
                                <tr>
                                    <th className='title'>Runtime</th>
                                    <th className='value'>{runtime}</th>
                                </tr>
                                <tr>
                                    <th className='title'>Premiur Show</th>
                                    <th className='value'>{premiered}</th>
                                </tr>
                                <tr>
                                    <th className='title'>Staus</th>
                                    <th className='value'>{status}</th>
                                </tr>
                                <tr>
                                    <th className='title'>Schedule</th>
                                    <th className='value'>{schedule.days}</th>
                                </tr>
                            </table>

                        </div>
                    </div>
                </div>
            }
        </div>
    )


}
export default Item;