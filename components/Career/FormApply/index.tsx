import Button from "@commons/Button";
import styles from "./FormApply.module.scss";
import { Col, Form, Input, Row, Upload, Typography } from "antd";
import { useState, useEffect, use } from "react";
import { addApplicant } from "query/CareerQuery";

type FormApplyPropsType = {
    activeLocation: string
    activeType: string
    posisiId: number
    typeId: number
    locationId: number
}

const FormApply = (props: FormApplyPropsType) => {

    const {activeLocation, activeType, posisiId, typeId, locationId} = props
    const [locationJob, setLocation] = useState("")
    const [type, setType] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [response, setResponse] = useState<any>(null)
    const [file, setFile] = useState(null)
    const [isValidSize, setValidSize] = useState(false)

    useEffect(() => {
        setTimeout(() => {setLocation(activeLocation)
        setType(activeType)}, 300)
    })

    const handleFullName = (e: any) => {
        setFullName(e.target.value);
    }
    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    }

    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    function isValidNumber (phone){
        const numberRegex = /^[0-9]*$/;
        return numberRegex.test(phone) && phone != "";
    }

    const checkFileSize = (file) => {
        const maxSize = 2 * 1024 * 1024;
        let status;
        if(file.size > maxSize){
            setValidSize(false)
            status = false;
        }else{
            setValidSize(true)
            status = true;
        }

        return status;
    }

    const handlePhoneNumber = (e: any) => {
        setPhoneNumber(e.target.value);
    }

    const handleFile = (e) => {
        if(e.file.status === 'done'){
            setFile(e.file.originFileObj);
        }
    }


    const handleSubmit = async () => {
        try {
            const emailSubmit = email
            const fileSubmit = file
            const typeIdSubmit = typeId
            const locationIdSubmit = locationId
            const fullNameSubmit = fullName
            const phoneNumberSubmit = phoneNumber
            const posisiIdSubmit = posisiId

            const responseStatus = await addApplicant(emailSubmit, fileSubmit, typeIdSubmit, locationIdSubmit, fullNameSubmit, phoneNumberSubmit, posisiIdSubmit);
            setResponse(responseStatus)
        } catch (error){
            console.error("Error:", error)

        }
    }

    return (
        <div className={styles.form}>
            <Form size="large">
                <Button className={styles.form__kategori} title={type} typeButton="outline" />
                <Button className={styles.form__kategori} title={locationJob} typeButton="outline" />
                <Form.Item>
                    <Input bordered={false} placeholder="Your full name" onChange={handleFullName}/>
                </Form.Item>
                <Form.Item rules={[{type:'email'}]}>
                    <Input bordered={false} placeholder="Your email address" onChange={handleEmail}/>
                </Form.Item>
                <Form.Item>
                    <Input bordered={false} placeholder="Your phone number" onChange={handlePhoneNumber}/>
                </Form.Item>
                <Row justify="space-between" gutter={[5, 40]} className={styles.form__buttonSection}>
                    <Col span={11}>
                        <Typography className={styles.form__CVTitle}>Upload Your CV (.pdf & Max 2mb)</Typography>
                    </Col>
                    <Col span={9}>
                        <Upload className={styles.form__upload} accept=".pdf" onChange={handleFile} maxCount={1} action={'/core-service/v1/file/noop'} beforeUpload={checkFileSize}>
                            <Button className={styles.form__button} title="Upload CV" typeButton="outline"/>
                        </Upload>
                    </Col>
                </Row>

                {isValidEmail(email) && isValidSize && fullName !== "" && isValidNumber(phoneNumber) && <Button className={styles.form__buttonApply} title="Submit Your Application" typeButton="default" onClick={handleSubmit}/>}
            </Form>
        </div>
    )
};

export default FormApply;
