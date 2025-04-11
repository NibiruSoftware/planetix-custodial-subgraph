import {
  Deposited as DepositedEvent,
  WithdrawRequested as WithdrawRequestedEvent,
  Withdrawn as WithdrawnEvent
} from "../generated/PIXOffchainCustodial/PIXOffchainCustodial"
import {
  Deposited,
  WithdrawRequested,
  Withdrawn,
  Account
} from "../generated/schema"

export function handleDeposited(event: DepositedEvent): void {
  let entity = new Deposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  let account = Account.load(event.params.depositor)
  if (!account) {
    account = new Account(event.params.depositor)
    account.save()
  }

  entity.depositor = account.id
  entity.amount = event.params.amount
  entity.timestamp = event.params.timestamp
  entity.nonce = event.params.nonce

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawRequested(event: WithdrawRequestedEvent): void {
  let entity = new WithdrawRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  let account = Account.load(event.params.withdrawer)
  if (!account) {
    account = new Account(event.params.withdrawer)
    account.save()
  }

  entity.withdrawer = account.id
  entity.amount = event.params.amount
  entity.timestamp = event.params.timestamp
  entity.nonce = event.params.nonce

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawn(event: WithdrawnEvent): void {
  let entity = new Withdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  let account = Account.load(event.params.withdrawer)
  if (!account) {
    account = new Account(event.params.withdrawer)
    account.save()
  }

  entity.withdrawer = account.id
  entity.amount = event.params.amount
  entity.timestamp = event.params.timestamp
  entity.nonce = event.params.nonce
  entity.withdrawalRequestNonce = event.params.withdrawalRequestNonce

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
