import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import SimpleCampaignPost from '@/components/Common/SimpleCampaignPost';
import { useSelector } from 'react-redux';
import {getOne } from '../../firebase-crowdfund/queries'
import {db, firebase} from '../../firebase-crowdfund/index' 
import SimpleCampaignPostCrea from '../Common/SimpleCampaignPostCrea';


 
const ProjectGridMainCrea = () => {

    const [projectList, setProjects] = React.useState([])   
    var campaigns = []

    React.useEffect(() => {
        db.collection("creatorPage")
        .get()
        .then((docs) => {
            docs.forEach(element => {
                    campaigns.push(element.data())
            })
    
            setProjects(campaigns)
    
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }, [])

    const displayProjects = () => {
        const len = projectList.length > 9 ? 9 : projectList.length
        var rows = [];
        for (var i = 0; i < len; i++) {
                    rows.push( <div key={i} className="col-lg-3 col-md-6" style={{marginTop: 100}}>
            <SimpleCampaignPostCrea project={projectList[i]}
                />
            </div>);
        }
        return rows;
      }

    return (
        <> 
           <div className="boxes-area">
			    <div className="container">
                    <div className="section-title">
                        <span className="sub-title">Featured creators</span>
                        <h2>Discover content creators that inspire you</h2>
                        <div className="bar"></div>
                    </div>
                    <div className="row">
                        {displayProjects()}
                                    
                                    <div className="col-lg-12 col-md-12">
                                        <div className="pagination-area">
                                            <nav aria-label="Page navigation">
                                            <Link href={{
                                                    pathname: "SearchPage",
                                                    query: {
                                                        id: "explore",
                                                    }
                                                }} activeClassName="active">
                                                <a className="btn btn-primary">Explore more...</a>
                                            </Link>
                                            </nav>
                                        </div>
                                    </div>
                            </div>
                </div>
            </div>
        </>
    )
}

export default ProjectGridMainCrea;