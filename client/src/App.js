import React, { Component } from 'react';
import {Route, Routes} from 'react-router-dom';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import {Gallery} from './Components/Gallery';
import Portfolio from './Components/Portfolio';
import Upload from './Components/Upload';
/*import Navbar from "./tutorial-components/navbar";
import RecordList from "./tutorial-components/record-list";
import Edit from "./tutorial-components/edit";
import Create from "./tutorial-components/create";
*/
export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  getResumeData(){
    $.ajax({
      url:'/resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount(){
    this.getResumeData();
  }
  //<Portfolio data={this.state.resumeData.portfolio}/>
  //<Contact data={this.state.resumeData.main}/>
  render() {
    return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={
            <div>
              <Header data={this.state.resumeData.main}/>
              <About data={this.state.resumeData.main}/>
              <Resume data={this.state.resumeData.resume}/>
              <Gallery data={this.state.resumeData.gallery}/>
              <Footer data={this.state.resumeData.main}/>
            </div>
          }/>
          <Route path="/albums" element={<Gallery />}/>
          <Route path="/upload" element={<Upload />}/>
        </Routes>
      </div>
    );
  }
}
/*
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
    );
}
export default App;
*/
