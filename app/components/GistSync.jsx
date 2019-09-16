import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapsible } from 'grommet';
import TextInput from 'UI/TextInput';
import { Github } from 'grommet-icons';
import Gists from 'Utils/gistsService';
import { toast } from 'react-toastify';
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
    const { githubUserName, githubPassword } = this.props;
    if ((githubUserName, githubPassword)) {
      this.authToGithub(githubUserName, githubPassword);
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
    toast.success(`Connected to ${gistId}`);
  }

  async createGist() {
    try {
      const newGist = await this.gists.create({
        files: {
          'mdyna.json': {
            content: 'test',
          },
        },
        description: 'Mdyna Cards',
        public: false,
      });
      if (newGist) {
        const gistList = await Gists.getUserGists();
        if (gistList) {
          const newGistIds = gistList.filter(
            gist => gist.description === 'Mdyna Cards',
          );
          this.updateGist(newGistIds && newGistIds[0].id);
        }
      }
    } catch (e) {
      toast.error('Could not create gist');
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
      syncSuccess,
      badge,
      loginToGh,
      loginToGhSuccess,
      loginToGhFail,
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
            !githubPassword
            || (!githubUserName && (
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
            ))
          )}
        </Collapsible>
        <Button onClick={() => this.expandGists(!expanded)}>
          <Github />
          {gistId
            && githubUserName
            && githubAuthOn
            && `Connected to ${githubUserName}/${gistId}`}
        </Button>
        {loadingGitHub && <Loader />}
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
  loginToGh: PropTypes.func.isRequired,
  loginToGhSuccess: PropTypes.func.isRequired,
  loginToGhFail: PropTypes.func.isRequired,
  updateGist: PropTypes.func.isRequired,
};

GistSync.defaultProps = {
  badge: false,
};

export default GistSync;
