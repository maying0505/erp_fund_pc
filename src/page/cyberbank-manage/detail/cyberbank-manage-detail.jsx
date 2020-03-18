import React from 'react';
import CompanyDetail from 'components/CompanyDetail/detail';
import * as HTTP from 'units/Axios';

class CyberbankManageDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ifSupplement: this.props.match.params['ifSupplement'] ? this.props.match.params['ifSupplement'] : '1',
            showModule: [],
            queryHttpUrl: HTTP.cyberbankManageQuery,
            updateHttpUrl: HTTP.cyberbankManageUpdate,
            submitHttpUrl: HTTP.cyberbankManageSubmit,
            id: Number(this.props.match.params['id']) ? Number(this.props.match.params['id']) : -1,
            ifShow: this.props.match.params['ifShow'] ? this.props.match.params['ifShow'] : '0'
        }
    }

    componentDidMount() { //预加载数据
        console.log('props:',this.props.match.params)
    }
    handleFormBack = (e) => {
        sessionStorage.setItem('_ifBack','0');
        this.props.history.go(-1);
    }

    render() {
        const { submitHttpUrl, ifSupplement, updateHttpUrl, queryHttpUrl, ifShow, id, showModule } = this.state;
        return (
            <CompanyDetail submitHttpUrl={submitHttpUrl} ifCyberbank={true} ifCheck={ifSupplement === '2' ? true: false} ifSupplement={ifSupplement === '3' ? true: false} updateHttpUrl={updateHttpUrl} handleFormBack={this.handleFormBack} showModule={showModule} ifShow={ifShow} id={id} queryHttpUrl={queryHttpUrl}/>
        )
    }
}

export default CyberbankManageDetail
