import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchArticle } from "../actions";

class ArticleShow extends Component {
    // constructor(props) {
    //     console.log('in article props is', props)
    // }


    componentDidMount() {
        const { title } = this.props.match.params;
        console.log('in article show title is', this.props.articles)
        // fetchArticle
        // this.props.article
        const url = this.props.articles[title].url;
        console.log('in article show url is', url)
        this.props.fetchArticle(url);
    }



     render() {
        const { article } = this.props;

        if (!article) {
            return <div>Loading...</div>;
        }

         return (
            <div>
             article is: {}.
            </div>
         );

     }
}


function mapStateToProps(state) {
    return { article: state.article,
            articles: state.articles };
}

export default connect(mapStateToProps, { fetchArticle })(ArticleShow);