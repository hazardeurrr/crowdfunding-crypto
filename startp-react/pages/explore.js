import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import SimpleCampaignPost from '@/components/Common/SimpleCampaignPost';
import SimplePreCampaignPost from '@/components/Common/SimplePreCampaignPost';

import CategoryList from '@/utils/CategoryList';
import Checkbox from '@material-ui/core/Checkbox';
import categoryList from '@/utils/CategoryList';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Pagination from '@material-ui/lab/Pagination';
import {connect} from 'react-redux'
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'
import { campaignAbi } from '@/components/ContractRelated/CampaignAbi';

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

class Explore extends React.Component {

    constructor(props){
        super(props);
        // console.log(this.props.allCampaigns)
        this.props = props
        this.languagesSelected = ["EN"];
        this.categoriesSelected = [];
        this.networksSelected = [];
        this.nbByPage = 9;

        this.state = {
            projects: this.props.allCampaigns,
            checked: this.populateCheckArray(),
            network_checked: [chain, bnb_chain],
            page: 1,
            preprojects: this.props.allPreCampaigns
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

      handleChangeNetwork = (event) => {
        let e = event.target.name
        if(this.state.network_checked.includes(e)){
          let newArr = this.state.network_checked.filter(a => a != e)
          this.setState({network_checked: newArr})
        }
        else {
          let newArr = [...this.state.network_checked, e]
          this.setState({network_checked: newArr })
        }
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

      networkCheckboxes = () => {
        var rows = [];
        rows.push(<FormControlLabel key={0}
          control={<Checkbox color="primary" checked={this.state.network_checked.includes(bnb_chain)} onChange={this.handleChangeNetwork} name={bnb_chain} />}
          label={<section>
            BNB Chain 
            {/* <img style={{height: 17}} src="/images/cryptoicons/bnb.svg"/> */}
          </section>}
        />);
        rows.push(<FormControlLabel key={1}
          control={<Checkbox color="primary" checked={this.state.network_checked.includes(chain)} onChange={this.handleChangeNetwork} name={chain} />}
          label={<section>
            Ethereum 
            {/* <img style={{height: 17}} src="/images/cryptoicons/eth.svg"/> */}
          </section>}
        />);
        return rows;
      }

    componentDidMount(){
        //  this.allCampaigns = getCampaigns()
        //  this.setState({projects: this.allCampaigns})
         if(this.props.cat != "all"){
            const s = this.props.cat
            const i = categoryList.indexOf(s)
            this.addCategory(i)
            this.setState({checked: this.CheckedArrayChanged(i)})
         }
    }

    componentDidUpdate(prevProps) {
        // Utilisation classique (pensez bien à comparer les props) :
        console.log("didupdatecalled")
        if (this.props.allCampaigns !== prevProps.allCampaigns || this.props.allPreCampaigns !== prevProps.allPreCampaigns) {
          console.log("new load")
          this.loadProjects();
        }
      }


    dynamicSearch(){
        // console.log(this.categoriesSelected)
        //return this.allCampaigns.filter(p => p.categories.some(r=> this.categoriesSelected.includes(r)))

        return this.props.allCampaigns.filter(p => p.categories.some(r=> this.categoriesSelected.includes(r)))
      }

    dynamicSearchPre(){
        // console.log(this.categoriesSelected)
        //return this.allCampaigns.filter(p => p.categories.some(r=> this.categoriesSelected.includes(r)))

        return this.props.allPreCampaigns.filter(p => p.categories.some(r=> this.categoriesSelected.includes(r)))
      }


    
    loadProjects(){
        this.setState({page: 1})
        if(this.categoriesSelected.length == 0){
        //   this.setState({projects: this.allCampaigns})
            this.setState({projects: this.props.allCampaigns})
            this.setState({preprojects: this.props.allPreCampaigns})
        }
        else{
          this.setState({projects: this.dynamicSearch()})
          this.setState({preprojects: this.dynamicSearchPre()})
        }
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
        // var lproj = this.state.projects.filter(p => this.state.network_checked.includes(p.network))
        var lproj = this.state.projects.concat(this.state.preprojects)
        var lproj_old = this.state.projects
        var allPreCampaigns = this.state.preprojects
        
        //[0 ... 20[ [20 ... 40[
        var len = lproj.length < (this.state.page) * this.nbByPage ? lproj.length : (this.state.page) * this.nbByPage;
        // console.log("len : " + len + " / print page : " + this.state.page)
        for (var i = (this.state.page - 1) * this.nbByPage; i < len; i++) {
          if(lproj[i].currency == "$" || lproj[i].currency == "€"){
            rows.push( <div key={i} className="col-lg-4 col-md-6">
            <SimplePreCampaignPost project={lproj[i]}/>
            </div>)
          }
          else {  
            rows.push( <div key={i} className="col-lg-4 col-md-6">
            <SimpleCampaignPost project={lproj[i]} creator={lproj[i].creator}
            />
            </div>)
          };
        }
        return rows;
      }



    render(){
        
        return (
            <>
                {/* <Navbar /> */}
                <div className="features-area pt-80 bg-f7fafd">
                    <div className="container">
                        <div className="section-title">
                            <h2 className="search-page-title">Discover projects that need you !</h2>
                            <div className="bar"></div>
                            {/* <CheckboxList alreadyChecked = {categoryList.indexOf(this.props.cat)} addCat = {this.addCategory} removeCat = {this.removeCategory} /> */}
                            {/* {this.networkCheckboxes()}
                            <br></br> */}
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

                                    <Pagination count={Math.ceil(this.state.projects.length / this.nbByPage)} page={this.state.page} onChange={this.handlePaginationChange.bind(this)} color="standard" />



                                </div>
                            </div>
                        </div>
                <Footer />
            </>
        )
    }
}

const mapStateToProps = state => {
  console.log(state.allPreCampaigns)
    return {
        allCampaigns: state.allCampaigns,
        allPreCampaigns: state.allPreCampaigns
    }
}

export default connect(
    mapStateToProps   
  )(Explore);

export async function getServerSideProps (context) {
    // console.log(context.query) 
    // returns { id: episode.itunes.episode, title: episode.title}
    
    if(context.query.id !== undefined && context.query.id !== null){
      return {
        props: { 
           cat: context.query.id //pass it to the page props
        }
      }
    } else {
      return {
        props: { 
           cat: "all" //pass it to the page props
        }
      }
    }
    //you can make DB queries using the data in context.query
    
  }