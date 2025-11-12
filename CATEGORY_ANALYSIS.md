# DBATOOLS COMMANDS.JSON - CATEGORIZATION ANALYSIS

## OVERVIEW
- **Total Commands**: 684
- **Total Categories**: 10
- **File Location**: `c:\github\web\static\commands.json`

## CATEGORY DISTRIBUTION

| Rank | Category | Count | % | Type |
|------|----------|-------|---|------|
| 1 | Utilities | 318 | 46.5% | Catch-all |
| 2 | Security | 71 | 10.4% | Keyword-driven |
| 3 | Migration | 61 | 8.9% | Verb-driven |
| 4 | Performance | 48 | 7.0% | Domain-driven |
| 5 | Advanced Features | 44 | 6.4% | Domain-driven |
| 6 | Agent & Jobs | 43 | 6.3% | Tag-driven |
| 7 | Server Management | 34 | 5.0% | Tag + Verb-driven |
| 8 | Backup & Restore | 29 | 4.2% | Verb + Tag-driven |
| 9 | Database Operations | 28 | 4.1% | Tag + Domain-driven |
| 10 | Data Operations | 8 | 1.2% | Domain-driven |

## CATEGORIZATION DECISION TREE

### STEP 1: CHECK COMMAND VERB (Highest Priority)
```
Copy-*         -> MIGRATION (32 commands, 98% accuracy)
Export-*       -> MIGRATION (20 commands, 98% accuracy)
Backup-*       -> BACKUP & RESTORE (5 commands)
Restore-*      -> BACKUP & RESTORE (3 commands)
```

### STEP 2: CHECK PRIMARY TAGS
```
'agent' tag                                        -> AGENT & JOBS (97% of category)
'certificate', 'encryption', 'login', 'permission' -> SECURITY
'instance' tag                                     -> SERVER MANAGEMENT (47% of category)
'database' tag                                     -> DATABASE OPERATIONS (39% of category)
'backup' tag                                       -> BACKUP & RESTORE (72% of category)
'table' tag                                        -> DATA OPERATIONS
```

### STEP 3: CHECK COMMAND DOMAIN/NOUN
```
Agent* nouns (AgentJob, AgentAlert)              -> AGENT & JOBS
Database nouns (Database, DbFile, DbFileGroup)   -> DATABASE OPERATIONS
Replication nouns (Endpoint, Replica, Repl*)    -> ADVANCED FEATURES
Performance nouns (CPU, Memory, Wait, Latch, Plan, Trace, Queue) -> PERFORMANCE
DataOp nouns (DataGenerator, DataMasking, TableData) -> DATA OPERATIONS
```

### STEP 4: DEFAULT FALLBACK
```
Anything else                                      -> UTILITIES (catch-all)
```

## CATEGORY-SPECIFIC RULES

### UTILITIES (318 commands - 46.5%)
**Rule**: Catch-all for miscellaneous commands
- **Dominant Verbs**: Get (132), Remove (29), New (26), Invoke (25), Set (23), Test (18)
- **No Tag Pattern**: Mixed tags with no clear dominant pattern
- **Characteristics**:
  - Largest category by far
  - Get-* verbs that don't target specific domains
  - Mixed operations (Add, Disable, Install, etc.)
  - Default category when nothing matches
- **Examples**:
  - Add-DbaAgListener
  - Add-DbaExtendedProperty
  - Clear-DbaConnectionPool

### SECURITY (71 commands - 10.4%)
**Rule**: Keyword-based categorization
- **Primary Tags**: certificate (12), encryption (11), login (13), permission (5)
- **Verbs**: Get (22), Remove (14), New (10), Test (5), Add (3)
- **Characteristics**:
  - Keywords in descriptions: Certificate, Encryption, Login, Permission, Credential
  - Authentication, authorization, cryptography operations
  - Mix of operations on different object types
- **Examples**:
  - Add-DbaComputerCertificate
  - Enable-DbaDbEncryption
  - New-DbaLogin
  - Add-DbaDbRoleMember

### MIGRATION (61 commands - 8.9%)
**Rule**: VERB-DRIVEN (98% accuracy)
- **Primary Verbs**: Copy (32), Export (20), Import (7)
- **Characteristics**:
  - Moves server-level objects between instances
  - Copy-* and Export-* patterns are almost always MIGRATION
  - Exception: Copy-DbaBackupDevice goes to BACKUP & RESTORE
  - Object types: Agent jobs, credentials, logins, server config, custom errors
- **Examples**:
  - Copy-DbaAgentJob
  - Export-DbaUser
  - Copy-DbaDatabase
  - Copy-DbaCredential

### PERFORMANCE (48 commands - 7.0%)
**Rule**: Domain/keyword-based categorization
- **Keywords in Names**: CPU, Memory, Wait, Latch, Plan, Trace, Queue, PowerPlan
- **Verbs**: Get (24), Clear (3), Invoke (2), Start/Stop (2 each)
- **Characteristics**:
  - Performance monitoring and tuning
  - Statistics clearing operations
  - Extended Events and Trace operations
  - SQL Server performance analysis
- **Examples**:
  - Get-DbaCpuUsage
  - Clear-DbaPlanCache
  - Clear-DbaWaitStatistics
  - Disable-DbaTraceFlag

### ADVANCED FEATURES (44 commands - 6.4%)
**Rule**: Domain-based categorization
- **Primary Nouns**: Endpoint (7), Replica (4), Replication (3+), Partition
- **Characteristics**:
  - Specialized SQL Server features
  - Always On Availability Groups (replica operations)
  - Replication (distributor, publisher, articles)
  - Partitioning and endpoints
  - More complex than UTILITIES
- **Examples**:
  - Add-DbaAgReplica
  - Get-DbaDbPartitionFunction
  - Enable-DbaReplPublishing

### AGENT & JOBS (43 commands - 6.3%)
**Rule**: TAG-DRIVEN (97% accuracy)
- **Primary Tag**: 'agent' present in 42/43 commands
- **Secondary Tag**: 'job' present in 21/43
- **Verbs**: Get (13), Set (9), New (8), Remove (8)
- **Characteristics**:
  - Almost all commands have 'agent' tag
  - SQL Server Agent operations
  - Job steps, schedules, operators, alerts, categories
- **Examples**:
  - Get-DbaAgentJob
  - Set-DbaAgentSchedule
  - New-DbaAgentProxy

### SERVER MANAGEMENT (34 commands - 5.0%)
**Rule**: TAG-DRIVEN + VERB-BASED
- **Primary Tag**: 'instance' present in 16/34 commands
- **Verbs**: Connect, Disconnect, Test, Update, Get (11)
- **Characteristics**:
  - Instance-level connections and configurations
  - Build info, patches, service configuration
  - Hide instance settings
- **Examples**:
  - Connect-DbaInstance
  - Find-DbaInstance
  - Get-DbaBuild

### BACKUP & RESTORE (29 commands - 4.2%)
**Rule**: VERB-DRIVEN + TAG-DRIVEN
- **Primary Verbs**: Backup (5), Restore (3)
- **Primary Tag**: 'backup' present in 21/29 commands (72%)
- **Characteristics**:
  - Full, differential, log backups
  - Database, certificate, and key backups
  - Backup device management
  - Format and restore operations
- **Examples**:
  - Backup-DbaDatabase
  - Restore-DbaDatabase
  - Find-DbaBackup
  - Get-DbaBackupDevice

### DATABASE OPERATIONS (28 commands - 4.1%)
**Rule**: TAG-DRIVEN + DOMAIN-BASED
- **Primary Tag**: 'database' present in 11/28 commands
- **Primary Nouns**: Database (7), DbFile, DbFileGroup
- **Verbs**: Get (9), Set (5), Remove (4)
- **Characteristics**:
  - Direct database object operations
  - Mount, Dismount, Move, Rename operations
  - Database files, filegroups, compatibility
  - Note: NOT data inside databases (that's DATA OPERATIONS)
- **Examples**:
  - Add-DbaAgDatabase
  - Get-DbaDatabase
  - Dismount-DbaDatabase
  - Get-DbaDbFile

### DATA OPERATIONS (8 commands - 1.2%)
**Rule**: Domain-based categorization
- **Primary Nouns**: DbDataGenerator, DbDataMasking, TableData
- **Characteristics**:
  - Specialized data operations
  - Data generation and masking
  - Table data manipulation
  - Very small, distinct category
- **Examples**:
  - Invoke-DbaDbDataMasking
  - New-DbaDbDataGeneratorConfig
  - Write-DbaDbTableData

## KEY INSIGHTS FOR CATEGORIZATION

### 1. VERB IS MOST RELIABLE INDICATOR
- Copy/Export → MIGRATION (98% accuracy)
- Backup/Restore → BACKUP & RESTORE
- When verb indicates primary function, it's usually accurate

### 2. TAGS ARE SECOND MOST RELIABLE
- 'agent' tag → AGENT & JOBS (97% of category)
- 'backup' tag → BACKUP & RESTORE (72% of category)
- 'instance' tag → SERVER MANAGEMENT (47% of category)
- Tags directly reflect command purpose

### 3. SECURITY IS KEYWORD-DRIVEN
- Look for: certificate, encryption, login, permission in tags/description
- Not primarily verb-driven
- Mix of operations (Get, Remove, New, Set, Enable, Disable)

### 4. UTILITIES IS THE CATCH-ALL
- Commands that don't fit anywhere else
- Dominated by Get-* operations (132/318)
- No consistent pattern

### 5. DOMAIN KNOWLEDGE REQUIRED FOR OTHERS
- Advanced Features, Performance, Data Operations require SQL Server knowledge
- Not easy to determine from tags alone
- Requires understanding what command does

## CATEGORIZATION ALGORITHM FOR NEW COMMANDS

### Priority Order (use first matching rule)

1. **Copy verb** → MIGRATION
2. **Export verb** → MIGRATION
3. **Backup verb** → BACKUP & RESTORE
4. **Restore verb** → BACKUP & RESTORE
5. **'agent' tag** → AGENT & JOBS
6. **'certificate' OR 'encryption' OR 'login' OR 'permission' tag** → SECURITY
7. **'backup' tag** → BACKUP & RESTORE
8. **'instance' tag** → SERVER MANAGEMENT
9. **'database' tag** → DATABASE OPERATIONS
10. **'table' tag** → DATA OPERATIONS
11. **Domain keywords** (CPU, Memory, Wait, Latch, Plan, Trace, Queue, PowerPlan, Endpoint, Replica, Replication, Partition) → PERFORMANCE or ADVANCED FEATURES
12. **Default** → UTILITIES

### Application Steps

1. Extract verb from command name (Add, Get, Copy, Remove, etc.)
2. Check against rules 1-4
3. If no match, extract tags
4. Check against rules 5-10
5. If no match, analyze command description for domain keywords
6. Check against rule 11
7. If still no match, use UTILITIES (rule 12)

## TAG-TO-CATEGORY MAPPING SUMMARY

| Tag | Category | Frequency | Notes |
|-----|----------|-----------|-------|
| agent | AGENT & JOBS | 97% of category | Highly reliable |
| backup | BACKUP & RESTORE | 72% of category | Primary indicator |
| certificate | SECURITY | Common | Security keyword |
| encryption | SECURITY | Common | Security keyword |
| login | SECURITY | Common | Security keyword |
| permission | SECURITY | Common | Security keyword |
| instance | SERVER MANAGEMENT | 47% of category | Common indicator |
| database | DATABASE OPERATIONS | 39% of category | Primary indicator |
| table | DATA OPERATIONS | Common | Data manipulation |
| copy | MIGRATION | ~52% of commands | Verb-based |
| export | MIGRATION | ~33% of commands | Verb-based |

## EXAMPLE CATEGORIZATION DECISIONS

### Example 1: "Copy-DbaDatabase"
- Verb: Copy → Rule 1 matches
- **Decision: MIGRATION**

### Example 2: "Get-DbaDatabase"
- Verb: Get → No rule match
- Tags: get, database → Rule 9 matches (database tag)
- **Decision: DATABASE OPERATIONS**

### Example 3: "Get-DbaAgentJob"
- Verb: Get → No rule match
- Tags: get, agent, job → Rule 5 matches (agent tag, 97% reliable)
- **Decision: AGENT & JOBS**

### Example 4: "Add-DbaComputerCertificate"
- Verb: Add → No rule match
- Tags: add, certificate → Rule 6 matches (certificate tag)
- **Decision: SECURITY**

### Example 5: "Enable-DbaTraceFlag"
- Verb: Enable → No rule match
- Tags: enable, availability-groups → No rules match
- Description: "Enables trace flags" → Domain keyword: trace (rule 11)
- **Decision: PERFORMANCE**

### Example 6: "Get-DbaDbFile"
- Verb: Get → No rule match
- Tags: get → No rules match
- Description: "Retrieves database file information" → Domain: database object (DbFile)
- **Decision: DATABASE OPERATIONS**

### Example 7: "Invoke-DbaDbDataMasking"
- Verb: Invoke → No rule match
- Tags: invoke → No rules match
- Description: "Masks sensitive data in databases" → Domain: data masking
- **Decision: DATA OPERATIONS**

## STATISTICS BY VERB

| Verb | Utilities | Migration | Security | Performance | Advanced | Agent | Server Mgmt | Backup | Db Ops | Data Ops | Total |
|------|-----------|-----------|----------|-------------|----------|-------|------------|--------|--------|----------|-------|
| Get | 132 | 0 | 22 | 24 | 19 | 13 | 11 | 7 | 9 | 0 | 237 |
| Copy | 0 | 32 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 33 |
| Export | 0 | 20 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 20 |
| Remove | 29 | 0 | 14 | 2 | 7 | 8 | 0 | 3 | 4 | 1 | 68 |
| New | 26 | 0 | 10 | 2 | 5 | 8 | 2 | 0 | 2 | 1 | 56 |
| Invoke | 25 | 0 | 0 | 2 | 0 | 0 | 0 | 1 | 0 | 2 | 30 |
| Set | 23 | 0 | 3 | 2 | 3 | 9 | 3 | 0 | 5 | 0 | 48 |
| Test | 18 | 1 | 5 | 2 | 2 | 1 | 4 | 3 | 2 | 2 | 40 |
| Backup | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 5 | 0 | 0 | 5 |
| Restore | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 3 | 0 | 0 | 3 |
| Other | 65 | 8 | 17 | 14 | 8 | 4 | 14 | 6 | 6 | 2 | 144 |

## CONCLUSION

The categorization of dbatools commands follows a **hierarchical decision tree**:

1. **Verbs** are the strongest indicator (Copy → MIGRATION, Backup → BACKUP & RESTORE)
2. **Tags** are the second strongest indicator ('agent' → AGENT & JOBS, 'backup' → BACKUP & RESTORE)
3. **Domain/Noun analysis** is necessary for remaining commands (requires SQL Server knowledge)
4. **UTILITIES** is the catch-all for everything else

To replicate this categorization for new commands:
- Always check verb first
- Then check tags against the mapping table
- For remaining commands, analyze the command's domain and noun
- Default to UTILITIES if still uncertain

The most reliable categories (easiest to determine) are:
1. Migration (98% accuracy with Copy/Export verbs)
2. Agent & Jobs (97% accuracy with 'agent' tag)
3. Backup & Restore (verb + tag combined)

The most ambiguous category is Utilities, which contains anything that doesn't fit other categories.
