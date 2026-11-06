# Security boundaries for AI-assisted development

## Default permissions

- Read public documentation and public repository content.
- Draft code and documentation in a separate branch.
- Run tests that do not access private accounts or incur costs.
- Prefer local inference for sensitive inputs.
- Use least-privilege, read-only integrations wherever possible.

## Actions requiring explicit, specific approval

- Payments, purchases, subscriptions, API usage that can incur charges, or transfers of funds.
- Legal declarations, grant submissions, contracts, and commitments on behalf of a person or organization.
- Publishing releases, merging into the default branch, deleting data, changing access controls, or exposing private information.
- Installing software that requests broad device permissions or executes untrusted code.

## Secrets and personal data

Never place credentials, API keys, recovery codes, banking information, identity documents, or private customer information in source control, prompts, logs, or public issue trackers. Store secrets only in an appropriate local secret manager or environment configuration, never in committed files.

## Change management

Use feature branches. Review diffs and run tests before proposing a merge. Preserve the default branch. Back up important data before migrations or destructive operations. Document what was changed and how to undo it.

## Claims and reporting

Distinguish clearly between planned, prepared, tested, connected, deployed, and revenue-generating. Do not claim a model is connected until an end-to-end test succeeds. Do not claim revenue until a payment has actually cleared.