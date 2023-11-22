import React from 'react'
import {Buttom, Modal, Result} from 'antd';
import {useNavigate} from 'react-router-dom';

function OrdeResultModal(props) {
    const {visible, onCancel} = props;
    const naviate = useNaviate();

    const handleGoBack = () =>{
        navigate('/')
    }
 
  return (
        <models 
        title="Order Result"
        width={700}

        visible={visible}
        onCancel={onCancel}
        footer={null}
        >
            <Result
                status="sucecess"
                title="Successfully Purchased Products"
                subTitle="Thank you for you order"
                extra={[
                    <Button type='primary' key='console' onClick={handleGoBack}>
                        Ir a inicio
                    </Button>,
                    <Button key='close'>cerrar</Button>
                ]}
            >

            </Result>
            

        </models>
  )
}

export default OrdeResultModal
