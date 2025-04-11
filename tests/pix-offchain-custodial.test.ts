import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Deposited } from "../generated/schema"
import { Deposited as DepositedEvent } from "../generated/PIXOffchainCustodial/PIXOffchainCustodial"
import { handleDeposited } from "../src/pix-offchain-custodial"
import { createDepositedEvent } from "./pix-offchain-custodial-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let depositor = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let timestamp = BigInt.fromI32(234)
    let nonce = BigInt.fromI32(234)
    let newDepositedEvent = createDepositedEvent(
      depositor,
      amount,
      timestamp,
      nonce
    )
    handleDeposited(newDepositedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Deposited created and stored", () => {
    assert.entityCount("Deposited", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Deposited",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "depositor",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Deposited",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "Deposited",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )
    assert.fieldEquals(
      "Deposited",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nonce",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
