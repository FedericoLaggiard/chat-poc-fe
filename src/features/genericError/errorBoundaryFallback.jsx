import {App, Button, Collapse, Result, Typography} from "antd";
const { Paragraph, Text } = Typography;

function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
    return (
        <App style={{width:"100%",height:"100%"}}>
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary" onClick={resetErrorBoundary}>Back Home</Button>}
            >
                { 1===1 ?
                    <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                            }}
                        >
                            Some additional error informations:
                        </Text>
                    </Paragraph>
                    <Paragraph>
                        <Collapse ghost items={[
                            {
                                key: '0',
                                label: error.message,
                                children: error.stack,
                            },
                        ]} bordered={false} />
                    </Paragraph>
                </div> : null
                }
            </Result>
        </App>
    );
}

export default ErrorBoundaryFallback;