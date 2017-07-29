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


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    //height: 450,
    overflowY: 'auto',
  },
};

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}


class ArticlesIndex extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false, view: 'list' };
    }

    setCard() {
    this.setState({...this.state, view: 'card'});
    }

    setList() {
    this.setState({...this.state, view: 'list'});
    }

    setTile() {
    this.setState({...this.state, view: 'tile'});
    }


    componentDidMount() {
        console.log('I was triggered during componentDidMount')
        this.props.fetchArticles();
    }

    renderTab() {
        return (
              <Tabs>
    <Tab label="List" 
          onActive={this.setList.bind(this)}>

    </Tab>
    <Tab label="Tile" 
          onActive={this.setTile.bind(this)}>

    </Tab>
    <Tab
      label="Card"
      data-route="/home"
      onActive={this.setCard.bind(this)}
    >

    </Tab>
  </Tabs>
        );
    }

    renderArticles() {


                    if (this.state.view === 'list') {
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
            } else if (this.state.view === 'tile') {

return (

  <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      <Subheader>December</Subheader>
      {_.map(this.props.articles, article  => (
        <GridTile
          key={article.url}
          title={article.description}
          subtitle={<span>by <b>{article.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={article.urlToImage} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

            } else if (this.state.view === 'card') {
                 return _.map(this.props.articles, article => {
                return (
                  <Card>
    <CardHeader
      title="URL Avatar"
      subtitle="Subtitle"
      avatar="images/jsa-128.jpg"
    />
    <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
    >
      <img src={article.urlToImage} alt="" />
    </CardMedia>
    <CardTitle title="Card title" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>
  </Card>
  );
                 
            });

      
    }
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
                    <MenuItem>BBC</MenuItem>
                    <MenuItem>CNN</MenuItem>
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { articles: state.articles };
}

export default connect(mapStateToProps, { fetchArticles })(ArticlesIndex);