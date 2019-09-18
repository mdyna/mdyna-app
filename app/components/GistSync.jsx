import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapsible, Menu } from 'grommet';
import TextInput from 'UI/TextInput';
import { Github, Sync, Down } from 'grommet-icons';
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
      <React.Fragment>
        <Collapsible className="sync" direction="horizontal" open={expanded}>
          {expanded && gistList && gistList.length ? (
            <Menu
              label="Select Gist"
              dropBackground="dark-2"
              icon={<Down color="brand" />}
              dropAlign={{ top: 'bottom' }}
              items={[
                ...gistList.map(gist => ({
                  label: gist.description,
                  onClick: () => this.updateGist(gist.id),
                })),
                { label: 'Create new', onClick: () => this.createGist() },
              ]}
            />
          ) : (
            (!githubPassword || !githubUserName) && (
              <Box direction="column" justify="center" width="small">
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
              </Box>
            )
          )}
        </Collapsible>
        <Box direction="row">
          {(gistId && githubUserName && githubAuthOn && (
            <Box>
              <Button plain={false} onClick={() => this.expandGists(!expanded)}>
                <Github color="brand" />
                {`Connected to ${githubUserName}/${gistId}`}
              </Button>
              <Button plain={false} onClick={() => syncCards()}>
                <Sync color="brand" />
                {(syncSuccess && lastSyncDate && (
                  <React.Fragment>
                    {`last sync at ${lastSyncDate}`}
                  </React.Fragment>
                ))
                  || 'Sync'}
              </Button>
            </Box>
          )) || (
            <Button plain={false} onClick={() => this.expandGists(!expanded)}>
              Connect with GitHub
              <Github color="accent-2" />
            </Button>
          )}
          {(loadingGitHub || syncing) && <Loader />}
        </Box>
      </React.Fragment>
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
