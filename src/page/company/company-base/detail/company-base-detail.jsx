import React from 'react';
import CompanyDetail from 'components/CompanyDetail/detail';
import * as HTTP from 'units/Axios';

class CompanyBaseDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModule: [],
            queryHttpUrl: HTTP.companyBaseQuery,
            saveHttpUrl: HTTP.companyBaseSave,
            updateHttpUrl: HTTP.companyBaseUpdate,
            id: Number(this.props.match.params['id']) ? Number(this.props.match.params['id']) : -1,
            ifShow: this.props.match.params['ifShow'] ? this.props.match.params['ifShow'] : '0'
        }
    }

    componentDidMount() { //预加载数据
        console.log('props:',this.props.match.params)
        if (this.props.match.params['ifShow'] === '0' || this.props.match.params['ifShow'] === '1') {
            this.setState({
                showModule: [0]
            })
        } else if (this.props.match.params['ifShow'] === '2') {
            this.setState({
                showModule: []
            })
        }
    }
    handleFormBack = (e) => {
        sessionStorage.setItem('_ifBack','0');
        this.props.history.go(-1);
    }

    render() {
        const { updateHttpUrl, queryHttpUrl, saveHttpUrl, ifShow, id, showModule } = this.state;
        return (
            <CompanyDetail updateHttpUrl={updateHttpUrl} handleFormBack={this.handleFormBack} showModule={showModule} ifShow={ifShow} id={id} queryHttpUrl={queryHttpUrl} saveHttpUrl={saveHttpUrl}/>
        )
    }
}

export default CompanyBaseDetail
