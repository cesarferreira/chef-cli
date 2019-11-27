import test from "ava";
import cnv from "../recipes/celcius-to-kelvin"
        
test("Celcius to Kelvin test", t => {
    t.is(cnv.execute(0), 273.15, "Should convert correctly")
    t.is(cnv.execute(-15), 258.15, "Should convert negative figures correctly")
    t.is(cnv.execute(15.5), 288.65, "Should convert real numbers accurately")
});