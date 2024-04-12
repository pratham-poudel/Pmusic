import Buttons from "./Button";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export function RecentCard() {
    const [vidid, setVidid] = useState([]);
    const [results, setResults] = useState([]);

    const keys = ['AIzaSyAUJDlrGTsJPjuQpUyb_Hc7wdBIzETXgHg', 'AIzaSyAf5hgml-JpshPwTe3DnTEqzeK_8FIolQI', 'AIzaSyCDUPzSuLSvW4_p4hG53ynfb2msXvF5jSc']; // Array of API keys to try
    let keyIndex = 0; // Index to track which key to use

    const fetchWithNextKey = () => {
        const key = keys[keyIndex];

        // Fetch using the current key
        vidid.forEach(videoId => {
            fetch(`https://www.googleapis.com/youtube/v3/videos?key=${key}&id=${videoId}&part=snippet`)
                .then(response => {
                    if (!response.ok) {
                        // If response is not OK, switch to the next key
                        keyIndex++;
                        if (keyIndex <= keys.length) {
                            // If there are more keys, try fetching again with the next key
                            fetchWithNextKey();
                        } else {
                            // If no more keys available, handle the error
                            throw new Error('All keys failed');
                        }
                    } else {
                        // Response is OK, proceed with processing the data
                        return response.json();
                    }
                })
                .then(data => {
                    // Process data as usual
                    fetch(`https://www.googleapis.com/youtube/v3/videos?key=${key}&id=${videoId}&part=snippet,statistics`)
                        .then(response => response.json())
                        .then(videoData => {
                            const itemsWithViews = data.items.map((item, index) => ({
                                ...item,
                                views: videoData.items[index].statistics.viewCount
                            }));
                            console.log(itemsWithViews)
                            setResults(prevResults => [...prevResults, ...itemsWithViews]);
                        })
                        .catch(error => {
                            console.error('Error fetching video details:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        });
    };

    const fetchResults = async () => {
        try {
            const response = await fetch('https://node-react-app-t0m3.onrender.com/recentlyplayed'); // Assuming your backend endpoint is '/api/profile'
            if (response.ok) {
                const data = await response.json();
                setVidid(data);
                console.log(data)
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        if (vidid.length > 0) {
            fetchWithNextKey();
        }
    }, [vidid]);

    return (
        <>
            <Card className="mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-56">
                    <img className="w-full h-full object-cover"
                        src="https://m.media-amazon.com/images/I/71v9YKQxm2L._UF1000,1000_QL80_.jpg"
                        alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        Recently Played
                    </Typography>
                    <Typography>
                        The place is close to Barceloneta Beach and bus stop just 2 min by
                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                        night life in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={fetchResults}>View Recents</Button>
                </CardFooter>
                <div className="grid grid-cols-1 gap-6">
    {results.map(item => (
        <div key={item.id.videoId} className="bg-white rounded-lg shadow-md overflow-hidden relative flex items-start">
          
            <div className="w-48 h-32">
                <img src={item.snippet.thumbnails.high.url} alt={item.snippet.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-grow">
                <p className="text-lg font-semibold hover:underline">{item.snippet.title}</p>
                <p className="text-gray-600 mt-2">{item.snippet.channelTitle}</p>
                <p className="text-gray-600 mt-2">Views: {item.views}</p>
                <Buttons vidId={item.id} title={item.snippet.title} />
            </div>
        </div>
    ))}
</div>
             
            </Card>
           
        </>
    );
}
export default RecentCard;