import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import OurFeatures from '@/components/Features/OurFeatures';
import SingleFeatures from '@/components/Features/SingleFeatures';
import { getCampaigns } from '@/utils/projectList'
import SimpleCampaignPost from '@/components/Common/SimpleCampaignPost';
import Chip from '@material-ui/core/Button';
import CategoryList from '@/utils/CategoryList';
import ListGroup from 'react-bootstrap/ListGroup';
import CheckboxList from '@/components/Common/CheckboxList'
import Checkbox from '@material-ui/core/Checkbox';
import categoryList from '@/utils/CategoryList';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Pagination from '@material-ui/lab/Pagination';
import {connect} from 'react-redux'

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

class SearchPage extends React.Component {

    constructor(props){
        super(props);
        console.log(this.props.allCampaigns)
        this.props = props
        this.languagesSelected = ["EN"];
        this.categoriesSelected = [];
        this.nbByPage = 2;

        this.state = {
            projects: this.props.allCampaigns,
            checked: this.populateCheckArray(),
            page: 1
        }
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
    }

    

    populateCheckArray(){
        let arr = []
        categoryList.forEach(e => arr.push(false))
        return arr
    }

    handleChange = (event) => {
        let e = event.target.name
        if(this.state.checked[e])
          this.removeCategory(e)
        else
          this.addCategory(e)
        this.setState({checked: this.CheckedArrayChanged(e)})
      };

      CheckedArrayChanged(i){
          let arr = this.state.checked
          arr[i] = !arr[i]
          return arr
      }
    
    showCheckboxes = () => {
        var rows = [];
        for (var i = 0; i < CategoryList.length; i++) {
            rows.push(<FormControlLabel key={i}
              control={<GreenCheckbox checked={this.state.checked[i]} onChange={this.handleChange} name={i.toString()} />}
              label={CategoryList[i]}
            />);
        }
        return rows;
      }

    componentDidMount(){
        //  this.allCampaigns = getCampaigns()
        //  this.setState({projects: this.allCampaigns})
         if(this.props.cat != "explore"){
            const s = this.props.cat
            const i = categoryList.indexOf(s)
            this.addCategory(i)
            this.setState({checked: this.CheckedArrayChanged(i)})
         }
    }

    componentDidUpdate(prevProps) {
        // Utilisation classique (pensez bien à comparer les props) :
        if (this.props.allCampaigns !== prevProps.allCampaigns) {
          this.loadProjects();
        }
      }


    dynamicSearch(){
        console.log(this.categoriesSelected)
        //return this.allCampaigns.filter(p => p.categories.some(r=> this.categoriesSelected.includes(r)))

        return this.props.allCampaigns.filter(p => p.categories.some(r=> this.categoriesSelected.includes(r)))
      }
    
    loadProjects(){
        this.setState({page: 1})
        if(this.categoriesSelected.length == 0)
        //   this.setState({projects: this.allCampaigns})
            this.setState({projects: this.props.allCampaigns})
        else
          this.setState({projects: this.dynamicSearch()})

      }

      
    

    addCategory(i){
        this.categoriesSelected.push(categoryList[i]);
        this.loadProjects();
    }

    removeCategory(i){
        this.categoriesSelected = this.categoriesSelected.filter(x => x != categoryList[i])
        this.loadProjects();
    }

    handlePaginationChange = (event, value) => {
        this.setState({page: value});
      };

    displayProjects = () => {
        var rows = [];
        //[0 ... 20[ [20 ... 40[
        var len = this.state.projects.length < (this.state.page) * this.nbByPage ? this.state.projects.length : (this.state.page) * this.nbByPage;
        console.log("len : " + len + " / print page : " + this.state.page)
        for (var i = (this.state.page - 1) * this.nbByPage; i < len; i++) {
            rows.push( <div key={i} className="col-lg-4 col-md-6">
            <SimpleCampaignPost project={this.state.projects[i]}
            />
        </div>);
        }
        return rows;
      }



    render(){
        
        return (
            <>
                <Navbar />
                <div className="features-area pt-80 bg-f7fafd">
                    <div className="container">
                        <div className="section-title">
                            <h2 className="search-page-title">Discover the projects that need you !</h2>
                            <div className="bar"></div>
                            {/* <CheckboxList alreadyChecked = {categoryList.indexOf(this.props.cat)} addCat = {this.addCategory} removeCat = {this.removeCategory} /> */}
                            {this.showCheckboxes()}
                        </div>
                    </div>
                </div>

                <div className="blog-area ">
                            <div className="container">
                                <div className="row justify-content-center">
                                   {this.displayProjects()}
                                 
                                    
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

                                    <Pagination count={Math.ceil(this.state.projects.length / this.nbByPage)} page={this.state.page} onChange={this.handlePaginationChange.bind(this)} color="primary" />



                                </div>
                            </div>
                        </div>
                <Footer />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        allCampaigns: state.allCampaigns
    }
}

export default connect(
    mapStateToProps   
  )(SearchPage);

export async function getServerSideProps (context) {
    console.log(context.query) 
    // returns { id: episode.itunes.episode, title: episode.title}
    
  
    //you can make DB queries using the data in context.query
    return {
        props: { 
           cat: context.query.id //pass it to the page props
        }
    }
  }