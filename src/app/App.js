import React, { Component, createRef } from 'react'
import "./App.css";
import AboutResult from '../components/AboutResult';
import Header from '../components/Header'
import Loading from '../components/Loading';
import NewsList from '../components/NewsList';
import Pagination from '../components/Pagination';
import News, {newsCategory} from '../news';


const news = new News(newsCategory.technology);

class App extends Component {
  state = {
    data: {},
    isLoading: true,
    thePosition: 0,
  };

  searchRef = createRef();
  resultRef = createRef();
  itemRefList = [];

  componentDidMount() {
    news
      .getNews()
      .then((data) => this.setState({ data, isLoading: false }))
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
        this.setState({ isLoading: false });
      });

    this.searchRef.current.focus();
    window.addEventListener("scroll", this.listenToScroll);
  }

  listenToScroll = () => {
    let winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    let height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    let scrolled = (winScroll / height)*1000;

    this.setState({
      thePosition: scrolled,
    });
  };

  next = () => {
    if (this.state.data.isNext) {
      this.setState({ isLoading: true });
      news
        .next()
        .then((data) => this.setState({ data, isLoading: false }))
        .catch((err) => {
          console.log(err);
          alert("Something went wrong");
          this.setState({ isLoading: false });
        });
    }
  };

  prev = () => {
    if (this.state.data.isPrevious) {
      this.setState({ isLoading: true });
      news
        .prev()
        .then((data) => this.setState({ data, isLoading: false }))
        .catch((err) => {
          console.log(err);
          alert("Something went wrong");
          this.setState({ isLoading: false });
        });
    }
  };

  handlePageChange = (value) => {
    this.setState({
      data: {
        ...this.state.data,
        currentPage: Number.parseInt(value),
      },
    });
  };

  goToPage = () => {
    this.setState({ isLoading: true });
    news
      .setCurrentPage(this.state.data.currentPage)
      .then((data) => this.setState({ data, isLoading: false }))
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
        this.setState({ isLoading: false });
      });
  };

  changeCategory = (category) => {
    this.setState({ isLoading: true });
    news
      .changeCategory(category)
      .then((data) => this.setState({ data, isLoading: false }))
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
        this.setState({ isLoading: false });
      });
  };

  search = (term) => {
    this.setState({ isLoading: true });
    news
      .search(term)
      .then((data) => this.setState({ data, isLoading: false }))
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
        this.setState({ isLoading: false });
      });
  };

  goToTop = () => {
    window.scroll(0, this.resultRef.current.scrollTop);
  };

  render() {
    const {
      article,
      isPrevious,
      isNext,
      category,
      totalResult,
      currentPage,
      totalPage,
    } = this.state.data;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 offset-md-2">
            <Header
              category={category}
              changeCategory={this.changeCategory}
              search={this.search}
              ref={this.searchRef}
            />
            <AboutResult
              currentPage={currentPage}
              totalPage={totalPage}
              totalResult={totalResult}
              ref={this.resultRef}
            />
            {this.state.isLoading ? (
              <Loading />
            ) : (
              <div>
                <NewsList news={article} ref={this.itemRefList} />
                <Pagination
                  next={this.next}
                  prev={this.prev}
                  isNext={isNext}
                  isPrevious={isPrevious}
                  totalPage={totalPage}
                  currentPage={currentPage}
                  handlePageChange={this.handlePageChange}
                  goToPage={this.goToPage}
                />
                {this.state.thePosition > 300 && (
                  <button
                    className="goToTop btn btn-secondary"
                    onClick={this.goToTop}
                  >
                    Goto Top
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App

