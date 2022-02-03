// netlify.com의 serverless 기능 구현 => 보안위함(omdb 사이트 사용위한 개인허가 apikey 보안위함)
exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({
            name: 'Park',
            age: 25,
            email: 'park@mail.com'
        })
    }
}