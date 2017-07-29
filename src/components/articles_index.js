import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchArticles } from "../actions";
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

class ArticlesIndex extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    componentDidMount() {
        console.log('I was triggered during componentDidMount')
        this.props.fetchArticles();
    }

    renderTab() {
        return (
              <Tabs>
    <Tab label="Item One" >
      <div>
        <h2 style={styles.headline}>Tab One</h2>
        <p>
          This is an example tab.
        </p>
        <p>
          You can put any sort of HTML or react component in here. It even keeps the component state!
        </p>
        <Slider name="slider0" defaultValue={0.5} />
      </div>
    </Tab>
    <Tab label="Item Two" >
      <div>
        <h2 style={styles.headline}>Tab Two</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    </Tab>
    <Tab
      label="onActive"
      data-route="/home"
      onActive={handleActive}
    >
      <div>
        <h2 style={styles.headline}>Tab Three</h2>
        <p>
          This is a third example tab.
        </p>
      </div>
    </Tab>
  </Tabs>
        );
    }

    renderArticles() {

        return _.map(this.props.articles, article => {
            return (
                <ListItem key={article.url}
                    secondaryText={article.description}
                    leftAvatar={<Avatar src={article.urlToImage} />}
                    secondaryTextLines={2} >

                    <a href={article.url} >
                        {article.title}
                    </a>
                    {/* <Link to={`/news/${article.title}`}>
                {article.title}
                </Link>  */}
                </ListItem>
            );
        });
    }

    handleToggle() {
        if (this.state.open) {
            this.setState(...this.state, { open: false })
        } else {
            this.setState(...this.state, { open: true })
        }

    }

    render() {
        // debugger
        return (
            <div>
                <AppBar
                    title="News"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onTouchTap={this.handleToggle.bind(this)}
                />
                {this.renderTab()}
                <List>
                    {this.renderArticles()}
                </List>

                <Drawer docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { articles: state.articles };
}

export default connect(mapStateToProps, { fetchArticles })(ArticlesIndex);