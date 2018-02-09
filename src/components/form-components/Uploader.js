import { Upload, message, Button, Icon } from 'antd';


const Uploader = props => (
  <Upload {...props}>
    <Button>
      <Icon type="upload" /> Click to Upload
    </Button>
  </Upload>);

export default Uploader;
