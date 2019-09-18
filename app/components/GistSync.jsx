import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapsible } from 'grommet';
import TextInput from 'UI/TextInput';
import { Github, Sync, Checkmark } from 'grommet-icons';
import Gists from 'Utils/gistsService';
import Loader from 'UI/Loader';
import Button from 'UI/Button';

class GistSync extends PureComponent {
  state = {
    expanded: false,
    inputUsername: '',
    inputPw: '',
    gistList: [],
  };

  componentDidMount() {
    const { githubUserName, githubPassword, gistId } = this.props;
    if ((githubUserName, githubPassword)) {
      this.authToGithub(githubUserName, githubPassword);
      this.updateGist(gistId);
    }
  }

  async authToGithub(username, pw) {
    const { loginToGh } = this.props;
    const gistList = await loginToGh(username, pw);
    this.setState({ gistList });
  }

  async expandGists(expanded) {
    const { githubUserName } = this.props;
    if (expanded && githubUserName) {
      const gistList = await Gists.getUserGists();
      this.setState({
        expanded,
        gistList,
      });
    } else {
      this.setState({
        expanded,
      });
    }
  }

  async updateGist(gistId) {
    const { updateGist } = this.props;
    updateGist(gistId);
    this.expandGists(false);
  }

  async createGist() {
    const newGistId = await Gists.createGist();
    if (newGistId) {
      this.updateGist(newGistId);
    }
  }

  render() {
    const {
      githubUserName,
      githubPassword,
      gistId,
      lastSyncDate,
      githubAuthOn,
      loadingGitHub,
      syncing,
      syncCards,
      syncSuccess,
      badge,
    } = this.props;
    const {
      expanded, inputUsername, inputPw, gistList,
    } = this.state;
    return (
      <Box direction="row">
        <Collapsible className="sync" direction="horizontal" open={expanded}>
          {expanded && gistList && gistList.length ? (
            <Box>
              Select Gist
              {gistList.map(gist => (
                <Button onClick={() => this.updateGist(gist.id)} key={gist.url}>
                  {gist.description}
                </Button>
              ))}
              {<Button onClick={() => this.createGist()}>Create new</Button>}
            </Box>
          ) : (
            (!githubPassword || !githubUserName) && (
              <React.Fragment>
                <TextInput
                  label="Username"
                  value={inputUsername}
                  onChange={val => this.setState({ inputUsername: val })}
                />
                <TextInput
                  label="Password"
                  value={inputPw}
                  type="password"
                  onChange={val => this.setState({ inputPw: val })}
                />
                <Button
                  onClick={() => this.authToGithub(inputUsername, inputPw)}
                >
                  Login
                </Button>
              </React.Fragment>
            )
          )}
        </Collapsible>
        {(gistId && githubUserName && githubAuthOn && (
          <React.Fragment>
            <Button onClick={() => this.expandGists(!expanded)}>
              <Github />
              {`Connected to ${githubUserName}/${gistId}`}
            </Button>
            <Button onClick={() => syncCards()}>
              <Sync />
              {syncSuccess && lastSyncDate && (
                <React.Fragment>
                  <Checkmark />
                  {' '}
                  {`last sync at ${lastSyncDate}`}
                </React.Fragment>
              )}
            </Button>
          </React.Fragment>
        )) || (
          <Button onClick={() => this.expandGists(!expanded)}>
            <Github />
          </Button>
        )}
        {(loadingGitHub || syncing) && <Loader />}
      </Box>
    );
  }
}

GistSync.propTypes = {
  badge: PropTypes.bool,
  githubUserName: PropTypes.string.isRequired,
  githubPassword: PropTypes.string.isRequired,
  gistId: PropTypes.string.isRequired,
  lastSyncDate: PropTypes.string.isRequired,
  githubAuthOn: PropTypes.bool.isRequired,
  loadingGitHub: PropTypes.bool.isRequired,
  syncing: PropTypes.bool.isRequired,
  syncSuccess: PropTypes.bool.isRequired,
  syncCards: PropTypes.func.isRequired,
  loginToGh: PropTypes.func.isRequired,
  updateGist: PropTypes.func.isRequired,
};

GistSync.defaultProps = {
  badge: false,
};

export default GistSync;
