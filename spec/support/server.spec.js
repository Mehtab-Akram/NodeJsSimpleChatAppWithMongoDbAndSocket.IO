const request = require("request");


describe('calc', () => {
    it("should multiply 2 with 2", () => {
        expect(2 * 2).toBe(4);
    })
    it("should multiply two numbers", () => {
        expect(myFunction(2, 6)).toBe(12);
    })
})
function myFunction(first, secound) {
    return first * secound;
}
describe("Get Messages", () => {
    it("Should return 200 ok.", (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    })

    it("Should return a list that is not empty.", (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
            done();
        });
    })
})

describe("Get Messages from a user", () => {
    it("Should return 200 OK", (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done();
        })
    })
    it("Name should be Tim", (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('tim')
            done();
        })
    })

})