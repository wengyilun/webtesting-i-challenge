const enhancer = require('./enhancer.js');
// test away!

describe('Testing Enhancer', () => {
	describe('convertToNumber', () => {
		it('item durability should be a number', () => {
			const item = {name:'ellen', durability: "2", enhancement: 0}
			const item2 = {name:'ellen', durability: "tomorrow", enhancement: 0}
			expect(enhancer.convertToNumber(item).durability).toBe(2)
			expect(enhancer.convertToNumber(item2).durability).toBe(0)
		})
		it('item enhancement should be a number', () => {
			const item = {name:'ellen', durability: 2, enhancement: "3"}
			const item2 = {name:'ellen', durability: 2, enhancement: "Three"}
			expect(enhancer.convertToNumber(item).enhancement).toBe(3)
			expect(enhancer.convertToNumber(item2).enhancement).toBe(0)
		})
	})
	describe('applyBounds', () => {
		it('item durability should be a should be from 0 to 100', () => {
			const item = {name:'ellen', durability: 102, enhancement: 0}
			const item2 = {name:'ellen', durability: -1, enhancement: 0}
			expect(enhancer.applyBounds(item).durability).toBe(100)
			expect(enhancer.applyBounds(item2).durability).toBe(0)
		})
		it('item enhancement should be a should be from 0 to 100', () => {
			const item = {name:'ellen', durability: 2, enhancement: 25}
			const item2 = {name:'ellen', durability: 2, enhancement: -1}
			const item3 = {name:'ellen', durability: 2, enhancement: 0}
			expect(enhancer.applyBounds(item).enhancement).toBe(20)
			expect(enhancer.applyBounds(item2).enhancement).toBe(0)
			expect(enhancer.applyBounds(item2).enhancement).toBe(0)
		})
	})
	
	describe('Repair(item)', () => {
		it('should returns a new item with the durability restored to 100', () => {
			const item = {name:'ellen', durability: 2, enhancement: 0}
			const item2 = {name:'ellen', durability: 2, enhancement: 20}
			expect(enhancer.repair(item).durability).toBe(100)
			expect(enhancer.repair(item2).durability).toBe(100)
		})
	})
	describe('Success(item) should returns a new item object modified', () => {
		it('should returns a item with enhancement increases by 1.', () => {
			const item = {name:'ellen', durability: 2, enhancement: 0}
			expect(enhancer.succeed(item).enhancement).toBe(1)
		})
		it('should not change the enhancement level if it is 20 already', () => {
			const item = {name:'ellen', durability: 2, enhancement: 20}
			const item2 = {name:'ellen', durability: 2, enhancement: 19}
			const item3 = {name:'ellen', durability: 2, enhancement: 21}
			expect(enhancer.succeed(item).enhancement).toBe(20)
			expect(enhancer.succeed(item2).enhancement).toBe(20)
			expect(enhancer.succeed(item3).enhancement).toBe(20)
		})
		it('should not change the durability of the item', () => {
			const item = {name:'ellen', durability: 2, enhancement: 20}
			expect(enhancer.succeed(item).durability).toBe(2)
		})
	})

	describe('Fails should returns a new item object', () => {
		it('should decrease durability by 5 when enhancement is less than 15, ',  () => {
			const item = {name:'ellen', durability: 6, enhancement: 14}
			const item1 = {name:'ellen', durability: 12, enhancement: 14}
			const item2 = {name:'ellen', durability:0, enhancement: 14}
			expect(enhancer.fail(item).durability).toBe(1)
			expect(enhancer.fail(item1).durability).toBe(7)
			expect(enhancer.fail(item2).durability).toBe(0)
		})
		it('should decrease durability by 10 when enhancement is more than 15', () => {
			const item = {name:'ellen', durability: 16, enhancement: 17}
			const item2 = {name:'ellen', durability: 2, enhancement: 19}
			const item3 = {name:'ellen', durability: 0, enhancement: 21}
			expect(enhancer.fail(item).durability).toBe(6)
			expect(enhancer.fail(item2).durability).toBe(0)
			expect(enhancer.fail(item3).durability).toBe(0)
		})
		
		it('should decrease enhancement level by 1 when enhancement is more than 16', () => {
			const item = {name:'ellen', durability: 16, enhancement: 17}
			const item2 = {name:'ellen', durability: 2, enhancement: 19}
			expect(enhancer.fail(item).enhancement).toBe(16)
			expect(enhancer.fail(item2).enhancement).toBe(18)
		})
	})
})
