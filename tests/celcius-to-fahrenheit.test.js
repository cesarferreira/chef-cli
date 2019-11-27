import test from "ava";
import cnv from "../recipes/celcius-to-fahrenheit"
        
test("Celcius to Fahrenheit test", t => {
    t.is(cnv.execute(36), 96.8, "Should convert average body temperature correctly")
    t.is(cnv.execute(-56), -68.8, "Should convert negative values correctly")
    t.is(cnv.execute(12.5), 54.5, "Should convert real numbers accurately")
});