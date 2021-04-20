import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import OurFeatures from '@/components/Features/OurFeatures';
import SingleFeatures from '@/components/Features/SingleFeatures';
import projectList from '@/utils/projectList'
import SimpleCampaignPost from '@/components/Common/SimpleCampaignPost';
import Chip from '@material-ui/core/Button';
import CategoryList from '@/utils/CategoryList';
import ListGroup from 'react-bootstrap/ListGroup';
import CheckboxList from '@/components/Common/CheckboxList'
import Checkbox from '@material-ui/core/Checkbox';
import categoryList from '@/utils/CategoryList';


class SearchPage extends React.Component {

    constructor(props){
        super(props);
        this.languagesSelected = ["EN"];
        this.categoriesSelected = [];
        this.state = {
            projects: projectList
        }
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
    }

    dynamicSearch(){
        console.log(this.categoriesSelected + " cat selected")
        return this.state.projects.filter(p => p.categories.some(r=> this.categoriesSelected.includes(r)))
      }
    
    loadProjects(){
        if(this.categoriesSelected.length == 0)
          this.setState({projects: projectList})
        else
          this.setState({projects: this.dynamicSearch()})

      }
    

    addCategory(i){
        this.categoriesSelected = this.categoriesSelected.concat(categoryList[i]);
        this.loadProjects();
    }

    removeCategory(i){
        this.categoriesSelected = this.categoriesSelected.filter(x => x != categoryList[i])
        this.loadProjects();
    }

    displayProjects = () => {
        var rows = [];
        for (var i = 0; i < this.state.projects.length; i++) {
            rows.push( <div className="col-lg-4 col-md-6">
            <SimpleCampaignPost project={this.state.projects[i]}
            />
        </div>);
        }
        return <tbody>{rows}</tbody>;
      }



    // change to add and remove tag

    render(){
        
        return (
            <>
                <Navbar />
                <PageBanner />
                <div className="features-area pt-80 pb-50 bg-f7fafd">
                    <div className="container">
                        <div className="section-title">
                            <h2>Discover the projects that need you !</h2>
                            <div className="bar"></div>
                            <CheckboxList addCat = {this.addCategory} removeCat = {this.removeCategory} />
                        </div>
                    </div>
                </div>

                <div className="blog-area ptb-80">
                            <div className="container">
                                <div className="row justify-content-center">
                                   {this.displayProjects()}
                                   <div className="col-lg-4 col-md-6">
                                        <SimpleCampaignPost project={this.state.projects[0]}
                                        />
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <SimpleCampaignPost project={this.state.projects[1]}
                                        />
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <SimpleCampaignPost project={this.state.projects[2]}
                                        />
                                    </div>
                                    
                                    {/* Pagination */}
                                    {/* <div className="col-lg-12 col-md-12">
                                        <div className="pagination-area">
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination justify-content-center">
                                                    <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                                                    
                                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                    
                                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                    
                                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                    
                                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                <Footer />
            </>
        )
    }
}

export default SearchPage;