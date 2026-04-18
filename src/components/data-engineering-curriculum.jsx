import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const instructorLedWeeks = [
  {
    week: "Week 2",
    title: "Power BI I: Data Preparation & Core Visuals",
    objectives: [
      "Connect Power BI to CSV, Excel, and SQL sources.",
      "Clean and shape data using Power Query.",
      "Build a first dashboard with meaningful KPIs.",
    ],
    concepts: [
      "BI workflow, Power Query, relationships, and star schema basics.",
      "Visual encoding, chart selection, and dashboard usability.",
    ],
    project: "County Health Dashboard: outpatient visits and medicine stock by county.",
    tools: "Power BI Desktop, Excel/CSV, SQL Server or PostgreSQL (read-only)",
  },
  {
    week: "Week 3",
    title: "Power BI II: Data Storytelling & Publishing",
    objectives: [
      "Create interactive reports and drill-through pages.",
      "Build DAX measures for business logic.",
      "Publish and share reports responsibly.",
    ],
    concepts: [
      "DAX basics, row/filter context intro, RLS, storytelling with data.",
      "Report usability and stakeholder communication.",
    ],
    project: "Mobile Money Insights: trends by region, segment, and anomaly flags.",
    tools: "Power BI Service, DAX, workspace sharing",
  },
  {
    week: "Week 4",
    title: "SQL Fundamentals for Data Engineers",
    objectives: [
      "Write robust SQL queries for analysis and engineering.",
      "Use joins, aggregations, CTEs, and window functions.",
    ],
    concepts: [
      "SELECT pipeline, joins, GROUP BY/HAVING, CASE, CTEs.",
      "Query readability, correctness, and reproducibility.",
    ],
    project: "Retail Orders Mart: daily sales and customer activity queries.",
    tools: "PostgreSQL, DBeaver/pgAdmin, Git",
  },
  {
    week: "Week 5",
    title: "Advanced SQL & Data Modeling",
    objectives: [
      "Design analytical schemas for reporting and pipeline outputs.",
      "Optimize queries and reason about performance.",
    ],
    concepts: [
      "Normalization vs denormalization, star/snowflake schemas.",
      "Indexing, partitioning intro, execution plans, SCD concepts.",
    ],
    project: "SACCO Analytics Warehouse Model: members, loans, repayments, branches.",
    tools: "PostgreSQL, SQL execution plans, dbdiagram",
  },
  {
    week: "Week 6",
    title: "Python for Data Engineering I",
    objectives: [
      "Build Python scripts for ingestion and cleanup.",
      "Work safely with files, APIs, and structured data.",
    ],
    concepts: [
      "Functions, modules, virtual environments.",
      "Pandas basics, JSON/CSV handling, API requests.",
    ],
    project: "Public Data Ingestion Script for open data/API sources.",
    tools: "Python, Pandas, Requests, Jupyter/VS Code",
  },
  {
    week: "Week 7",
    title: "Python for Data Engineering II (Automation & Quality)",
    objectives: [
      "Create maintainable ETL scripts.",
      "Add tests, logging, configs, and CLI behavior.",
    ],
    concepts: [
      "Project structure, argparse/typer, logging, exception strategy.",
      "Data validation intro with Great Expectations/Pandera and unit tests.",
    ],
    project: "Automated Data Cleaner CLI with logs and validation report.",
    tools: "Python, pytest, Great Expectations/Pandera, pre-commit",
  },
  {
    week: "Week 8",
    title: "ETL/ELT Concepts & Pipeline Design",
    objectives: [
      "Design reliable source-to-warehouse pipelines.",
      "Choose ETL vs ELT based on constraints.",
    ],
    concepts: [
      "Batch ingestion, CDC intro, idempotency, incremental loads.",
      "Medallion architecture: bronze/silver/gold.",
    ],
    project: "NGO Donations Pipeline: ingest, clean, transform, and load trusted tables.",
    tools: "Python SQL pipeline scripts, PostgreSQL, MinIO/S3-compatible object storage",
  },
  {
    week: "Week 9",
    title: "Data Warehousing & Lakehouse Foundations",
    objectives: [
      "Build modern analytical storage architecture.",
      "Compare warehouse, lake, and lakehouse patterns.",
    ],
    concepts: [
      "Kimball basics, data marts, partition strategy.",
      "Lakehouse table format overview (Delta/Iceberg concepts).",
    ],
    project: "E-commerce Data Mart Design for sales, inventory, and behavior.",
    tools: "PostgreSQL/BigQuery/Synapse (one primary), Parquet",
  },
  {
    week: "Week 10",
    title: "Cloud for Data Engineers",
    objectives: [
      "Deploy storage and pipeline components on cloud.",
      "Apply IAM, secrets management, and basic cost control.",
    ],
    concepts: [
      "Compute, storage, IAM, and networking basics.",
      "Managed data services (Azure-first with AWS/GCP mapping).",
    ],
    project: "County Revenue Cloud Landing Zone with secure ingestion + warehouse schema.",
    tools: "Azure (recommended), optional AWS/GCP mapping, Terraform intro",
  },
  {
    week: "Week 11",
    title: "Containerization with Docker",
    objectives: [
      "Package pipeline applications as containers.",
      "Run a local multi-service stack with Compose.",
    ],
    concepts: [
      "Dockerfile, images, containers, networks, volumes.",
      "Environment parity across development, test, and production.",
    ],
    project: "Containerized ETL app: ETL service + Postgres + admin UI.",
    tools: "Docker, Docker Compose, Docker Hub/GHCR",
  },
  {
    week: "Week 12",
    title: "Workflow Orchestration with Apache Airflow",
    objectives: [
      "Author, schedule, and monitor DAGs.",
      "Build retry-safe, production-aware workflows.",
    ],
    concepts: [
      "DAG/task dependencies, sensors, hooks/operators.",
      "Backfills, SLAs, retries, idempotency, environment separation.",
    ],
    project: "Daily pipeline DAG: ingestion → validation → transform → publish.",
    tools: "Apache Airflow, Dockerized Airflow, SQL/Python operators",
  },
  {
    week: "Week 13",
    title: "Batch Data Processing at Scale",
    objectives: [
      "Build reliable high-volume batch jobs.",
      "Optimize processing windows and throughput.",
    ],
    concepts: [
      "Partitioned processing, checkpointing, job scheduling.",
      "Late-arriving data and backfill strategy.",
    ],
    project: "Utility Billing Batch System with monthly reconciliation.",
    tools: "Python + SQL jobs, Airflow scheduling, cloud/object storage",
  },
  {
    week: "Week 14",
    title: "Real-Time Data Processing & Streaming Fundamentals",
    objectives: [
      "Understand streaming architecture and event-time processing.",
      "Build near-real-time analytics pipelines.",
    ],
    concepts: [
      "Event streams, windows, watermarking, delivery semantics.",
      "Streaming trade-offs and operational decisions.",
    ],
    project: "Ride/Delivery Tracking Stream for live KPIs.",
    tools: "Spark Structured Streaming intro or Kafka Streams concepts",
  },
  {
    week: "Week 15",
    title: "Messaging Systems with Apache Kafka",
    objectives: [
      "Produce and consume events with robust topic design.",
      "Integrate Kafka with downstream systems.",
    ],
    concepts: [
      "Brokers, topics/partitions, consumer groups, retention.",
      "Schema management intro, DLQs, replay.",
    ],
    project: "M-Pesa-like Event Bus Simulation with fraud signal stream.",
    tools: "Apache Kafka, Kafka UI, Python producers/consumers",
  },
  {
    week: "Week 16",
    title: "Data Transformation with dbt + Monitoring with Grafana",
    objectives: [
      "Build tested transformation layers with dbt.",
      "Monitor system health and data freshness.",
    ],
    concepts: [
      "dbt models, tests, docs, lineage, snapshots.",
      "Metrics dashboards, alerts, SLO basics, runbook practice.",
    ],
    project: "Analytics engineering layer + Grafana alerts.",
    tools: "dbt Core/Cloud, PostgreSQL/warehouse, Grafana, Prometheus/Loki basics",
  },
];

const internshipWeeks = [
  "Week 17: Internship onboarding, KPI contracts, and architecture proposal.",
  "Week 18: Solution architecture, environment provisioning, and stack setup.",
  "Week 19: Ingestion from multiple sources with quality gates and quarantine patterns.",
  "Week 20: Silver/gold modeling with incremental dbt transformations and tests.",
  "Week 21: Streaming extension with Kafka and near-real-time dashboarding.",
  "Week 22: Observability, reliability, alerts, and incident response game day.",
  "Week 23: CI/CD pipelines for tests, deployments, rollback, and versioning.",
  "Week 24: Capstone demo day, technical defense, and portfolio publication.",
];

const optionalWeeks = [
  "Week 25: Remedial SQL, Python, and data modeling clinics.",
  "Week 26: Cloud specialization track (Azure, AWS, or GCP).",
  "Week 27: Advanced Spark performance tuning and optimization.",
  "Week 28: Interview sprint and certification support.",
];

export default function DataEngineeringCurriculum() {
  return (
    <section className="mt-16" id="data-engineering-curriculum">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-50 text-center">
        LuxDevHQ Data Engineering Curriculum (6 Months, Extendable to 7)
      </h2>
      <p className="text-slate-300 text-center max-w-3xl mx-auto mb-10">
        Week 1 remains exactly as currently designed at LuxDevHQ. From Week 2 onward,
        the roadmap below gives a clear, industry-aligned path focused on real projects,
        production workflows, and graduate employability.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="border-slate-600 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-blue-300">Program Design Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• 24-week baseline: Weeks 1-16 instruction + Weeks 17-24 internship.</li>
              <li>• Optional extension to Weeks 25-28 for remedial and specialization tracks.</li>
              <li>• Learning mix: 70% hands-on, 20% guided instruction, 10% assessments/reflection.</li>
              <li>• Portfolio-first delivery with production-style artifacts and capstone outputs.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-600 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-blue-300">Career Outcomes by Graduation</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• Junior Data Engineer</li>
              <li>• Analytics Engineer (entry level)</li>
              <li>• BI/Data Pipeline Developer</li>
              <li>• Data Operations Engineer (entry level)</li>
              <li>• Ability to design, deploy, test, and monitor end-to-end data systems.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-600 bg-slate-900 mb-8">
        <CardHeader>
          <CardTitle className="text-blue-300">Week-by-Week Curriculum (Weeks 2-16)</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {instructorLedWeeks.map((item) => (
              <AccordionItem value={item.week} key={item.week} className="border-slate-700">
                <AccordionTrigger className="text-left text-slate-100 hover:text-blue-300">
                  {item.week} — {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-300 space-y-3">
                  <div>
                    <p className="font-medium text-blue-200 mb-1">Learning objectives</p>
                    <ul className="list-disc ml-5 space-y-1">
                      {item.objectives.map((objective) => (
                        <li key={objective}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-200 mb-1">Key concepts</p>
                    <ul className="list-disc ml-5 space-y-1">
                      {item.concepts.map((concept) => (
                        <li key={concept}>{concept}</li>
                      ))}
                    </ul>
                  </div>
                  <p>
                    <span className="font-medium text-blue-200">Hands-on project:</span> {item.project}
                  </p>
                  <p>
                    <span className="font-medium text-blue-200">Tools/technologies:</span> {item.tools}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="border-slate-600 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-blue-300">Internship Phase (Weeks 17-24)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-300 text-sm">
              {internshipWeeks.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-600 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-blue-300">Optional Extension (Weeks 25-28)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-300 text-sm">
              {optionalWeeks.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-600 bg-slate-900">
        <CardHeader>
          <CardTitle className="text-blue-300">Assessment & Portfolio Framework</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-300 space-y-3">
          <p>Weekly check-ins include labs, mini-quizzes, and code reviews with practical build assessments.</p>
          <p className="font-medium text-blue-200">Portfolio artifacts expected by Week 24:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>1 Power BI dashboard</li>
            <li>2 SQL case studies</li>
            <li>2 Python ETL automation projects</li>
            <li>1 Dockerized data application</li>
            <li>1 Airflow-orchestrated pipeline</li>
            <li>1 Kafka/Spark streaming mini-system</li>
            <li>1 dbt project with tests, docs, and lineage</li>
            <li>1 Grafana monitoring stack with alerts</li>
            <li>1 capstone repository with CI/CD and architecture documentation</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
