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
import { Tabs, Tab } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';


import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const BBC = 'bbc-news';
const CNN = 'cnn';
const ABC = 'abc-news-au';
const BLOOMBERG = 'bloomberg';
const AL_JAZ = 'al-jazeera-english';

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
    this.state = { open: false, view: 'list', source: 'bbc-news' };
  }

  setCard() {
    this.setState({ view: 'card' });
  }

  setList() {
    this.setState({ view: 'list' });
  }

  setTile() {
    this.setState({ view: 'tile' });
  }

  setSource(source) {
    console.log("this is in the setSource", source);
    //Call back after state is changed.
    this.setState({ source }, () => {
      this.props.fetchArticles(this.state.source);
    });
  }

  componentDidMount() {
    this.props.fetchArticles(this.state.source);
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

            <a href={article.url} target="_blank">
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
            {_.map(this.props.articles, article => (
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
          <Card
            key={article.url}>
            {/* <CardHeader
              title="URL Avatar"
              subtitle="Subtitle"
              avatar="images/jsa-128.jpg"
            /> */}
            <CardMedia
              overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
            >
              <img src={article.urlToImage} alt="" />
            </CardMedia>
            <CardTitle title="Card title" subtitle={article.author} />
            <CardText>{article.description}
    </CardText>
            <CardActions>
                        <a href={article.url} target="_blank"><FlatButton label="More..." /> 
            </a>
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
          title="React News"
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
          <AppBar
            title={<span style={styles.title}>Source</span>}
            iconElementLeft={<Avatar>S</Avatar>}
          />
          <MenuItem
            checked={ this.state.source === BBC }
            insetChildren={true}
            onTouchTap={() => this.setSource(BBC)}
            value={BBC}
          >BBC</MenuItem>
          <MenuItem 
                      checked={ this.state.source === CNN }
            insetChildren={true}
            onTouchTap={() => this.setSource(CNN)}
          >CNN</MenuItem>
          <MenuItem
                      checked={ this.state.source === ABC }
            insetChildren={true}
            onTouchTap={() => this.setSource(ABC)}
          >ABC</MenuItem>
          <MenuItem
                      checked={ this.state.source === BLOOMBERG }
            insetChildren={true}
            onTouchTap={() => this.setSource(BLOOMBERG)}
          >Bloomberg</MenuItem>
          <MenuItem
                      checked={ this.state.source === AL_JAZ }
            insetChildren={true}
            onTouchTap={() => this.setSource(AL_JAZ)}
          >Al Jazeera</MenuItem>

        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { articles: state.articles };
}

export default connect(mapStateToProps, { fetchArticles })(ArticlesIndex);