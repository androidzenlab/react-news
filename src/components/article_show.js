import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchArticle } from "../actions";

class ArticleShow extends Component {

    componentDidMount() {
        const { title } = this.props.match.params;

        // fetchArticle
        const url = this.props.articles[title].url;
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