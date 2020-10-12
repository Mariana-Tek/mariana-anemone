const marianaAnemone = require("./index");
const zoid = require("zoid/dist/zoid.js");

jest.mock("zoid/dist/zoid.js", () => ({
    ...jest.requireActual("zoid/dist/zoid.js"),
    create: jest.fn(),
}));

afterEach(() => {
    jest.clearAllMocks();
});

const mockXprops = {
    auth: {
        getToken: jest.fn(),
    },
    navigation: {
        goToClass: jest.fn(),
        goToProfile: jest.fn(),
        redirect: jest.fn(),
    },
};

describe("initialize", () => {
    it("requires appId", () => {
        expect(() => {
            marianaAnemone.initialize(null, "client_id", "http://localhost:1234");
        }).toThrow(Error);
    });

    it("requires clientId", () => {
        expect(() => {
            marianaAnemone.initialize("app_id", null, "http://localhost:1234");
        }).toThrow(Error);
    });

    it("requires baseUrl", () => {
        expect(() => {
            marianaAnemone.initialize("app_id", "client_id", null);
        }).toThrow(Error);
    });

    it("returns expected object", () => {
        const mariana = marianaAnemone.initialize("app_id", "client_id", "http://localhost:1234");
        const expectedObject = {
            createComponent: expect.any(Function),
            auth: { getToken: expect.any(Function) },
            navigation: {
                goToClass: expect.any(Function),
                goToProfile: expect.any(Function),
                redirect: expect.any(Function),
            },
        };
        expect(mariana).toEqual(expect.objectContaining(expectedObject));
    });
});

describe("createComponent", () => {
    it("creates zoid component with correct config", () => {
        const expectedConfig = {
            tag: "app_id",
            url: "http://localhost:1234",
        };
        const mariana = marianaAnemone.initialize("app_id", "client_id", "http://localhost:1234");
        mariana.createComponent();

        expect(zoid.create).toHaveBeenCalledTimes(1);
        expect(zoid.create).toHaveBeenCalledWith(expectedConfig);
    });
});

describe("auth", () => {
    const mariana = marianaAnemone.initialize("app_id", "client_id", "http://localhost:1234");

    test("getToken calls xprops function with correct clientId", () => {
        window.xprops = mockXprops;
        mariana.auth.getToken();

        expect(window.xprops.auth.getToken).toHaveBeenCalledTimes(1);
        expect(window.xprops.auth.getToken).toHaveBeenCalledWith("client_id");
    });

    test("getToken throws without xprops", () => {
        window.xprops = undefined;
        expect(() => {
            mariana.auth.getToken();
        }).toThrow(Error);
    });
});

describe("navigation", () => {
    const mariana = marianaAnemone.initialize("app_id", "client_id", "http://localhost:1234");

    test("goToClass calls xprops function with correct value", () => {
        window.xprops = mockXprops;
        mariana.navigation.goToClass("123");

        expect(window.xprops.navigation.goToClass).toHaveBeenCalledTimes(1);
        expect(window.xprops.navigation.goToClass).toHaveBeenCalledWith("123");
    });

    test("goToClass throws without xprops", () => {
        window.xprops = undefined;
        expect(() => {
            mariana.navigation.goToClass("123");
        }).toThrow(Error);
    });

    test("goToProfile calls xprops function with correct value", () => {
        window.xprops = mockXprops;
        mariana.navigation.goToProfile("124");

        expect(window.xprops.navigation.goToProfile).toHaveBeenCalledTimes(1);
        expect(window.xprops.navigation.goToProfile).toHaveBeenCalledWith("124");
    });

    test("goToProfile throws without xprops", () => {
        window.xprops = undefined;
        expect(() => {
            mariana.navigation.goToProfile("124");
        }).toThrow(Error);
    });

    test("redirect calls xprops function with correct value", () => {
        window.xprops = mockXprops;
        mariana.navigation.redirect("https://marianatek.com");

        expect(window.xprops.navigation.redirect).toHaveBeenCalledTimes(1);
        expect(window.xprops.navigation.redirect).toHaveBeenCalledWith("https://marianatek.com");
    });

    test("redirect throws without xprops", () => {
        window.xprops = undefined;
        expect(() => {
            mariana.navigation.redirect("https://marianatek.com");
        }).toThrow(Error);
    });
});
